
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import apiServerClient from '@/lib/apiServerClient';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import Header from '@/components/Header.jsx';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAndFetchData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        // Verify payment with Stripe
        const response = await apiServerClient.fetch(`/stripe/session/${sessionId}`);
        const paymentData = await response.json();
        setPayment(paymentData);

        // Fetch booking details from PocketBase using the session ID
        const bookingRecords = await pb.collection('bookings').getList(1, 1, {
          filter: `stripeSessionId="${sessionId}"`,
          $autoCancel: false
        });

        if (bookingRecords.items.length > 0) {
          const foundBooking = bookingRecords.items[0];
          setBooking(foundBooking);

          // Update booking status if needed (usually handled by webhook, but good fallback)
          if (foundBooking.paymentStatus === 'unpaid' && paymentData.status === 'complete') {
            await pb.collection('bookings').update(foundBooking.id, {
              paymentStatus: 'deposit_paid',
              depositPaid: paymentData.amountTotal / 100
            }, { $autoCancel: false });
          }

          // Fetch tour details
          const tourRecord = await pb.collection('tours').getOne(foundBooking.tourId, { $autoCancel: false });
          setTour(tourRecord);
        }
      } catch (error) {
        console.error('Error verifying payment or fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyAndFetchData();
  }, [sessionId]);

  // Calculate dates and amounts
  const depositPaid = payment ? payment.amountTotal / 100 : (booking?.depositPaid || 0);
  const totalAmount = booking?.totalAmount || 0;
  const remainingBalance = totalAmount - depositPaid;
  
  let dueDate = null;
  if (booking?.bookingDate) {
    const tourDate = new Date(booking.bookingDate);
    dueDate = new Date(tourDate);
    dueDate.setDate(tourDate.getDate() - 7);
  }

  return (
    <>
      <Helmet>
        <title>Booking Confirmed - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Your booking has been confirmed" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                Booking Confirmed!
              </h1>
              
              <p className="text-lg text-gray-600 mb-8">
                Thank you for booking with Rockin' Kitchen Sicily. We can't wait to show you around!
              </p>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-32 bg-gray-100 rounded-xl"></div>
                </div>
              ) : booking && tour ? (
                <div className="text-left space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 border-b pb-2">Booking Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reference:</span>
                        <span className="font-bold text-gray-900">{booking.bookingReference}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tour:</span>
                        <span className="font-semibold text-gray-900">{tour.tourName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-semibold text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Participants:</span>
                        <span className="font-semibold text-gray-900">{booking.numberOfParticipants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-[#FFD700] shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-4 border-b pb-2 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-[#FF6B35]" />
                      Payment Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Tour Cost:</span>
                        <span className="font-semibold text-gray-900">€{totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Deposit Paid:</span>
                        <span>- €{depositPaid.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="font-bold text-gray-900">Remaining Balance:</span>
                        <span className="font-black text-xl text-[#FF6B35]">€{remainingBalance.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg flex items-start border border-orange-100">
                    <AlertCircle className="w-5 h-5 text-[#FF6B35] mr-3 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-800">
                      <p className="font-bold mb-1">Important Next Steps</p>
                      <p>Please complete the payment of your remaining balance (<strong>€{remainingBalance.toFixed(2)}</strong>) by <strong>{dueDate?.toLocaleDateString()}</strong> (7 days before your tour). We will send you a payment link via email.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 mb-8">We couldn't load your booking details, but your payment was successful. Please check your email for confirmation.</p>
              )}

              <div className="mt-10 space-y-4">
                <Link to="/">
                  <Button className="w-full bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold py-6 rounded-xl">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/stay">
                  <Button variant="outline" className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-bold py-6 rounded-xl">
                    Find a Place to Stay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
