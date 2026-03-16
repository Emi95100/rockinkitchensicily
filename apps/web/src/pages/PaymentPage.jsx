
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import { CreditCard, Euro, ShieldCheck, Info } from 'lucide-react';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRecord = await pb.collection('bookings').getOne(bookingId, { $autoCancel: false });
        setBooking(bookingRecord);

        const tourRecord = await pb.collection('tours').getOne(bookingRecord.tourId, { $autoCancel: false });
        setTour(tourRecord);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error loading booking',
          description: 'Booking not found',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId, toast]);

  const handlePayment = async (amount) => {
    setPaymentLoading(true);

    try {
      const response = await apiServerClient.fetch('/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          tourName: `${tour.tourName} (Deposit)`,
          bookingId: booking.id,
          successUrl: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
          cancelUrl: window.location.origin + '/cancel'
        })
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const data = await response.json();
      
      // Update booking with Stripe session ID
      await pb.collection('bookings').update(booking.id, {
        stripeSessionId: data.url.split('/').pop()
      }, { $autoCancel: false });

      // Open Stripe checkout in new tab to avoid iframe issues
      window.open(data.url, '_blank');
      
      toast({
        title: 'Redirecting to payment',
        description: 'Complete your payment in the new window'
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment failed',
        description: error.message || 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Loading...</div>
        </div>
      </>
    );
  }

  if (!booking || !tour) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Booking not found</div>
        </div>
      </>
    );
  }

  const depositAmount = booking.totalAmount * 0.30;
  const remainingAmount = booking.totalAmount - depositAmount;

  return (
    <>
      <Helmet>
        <title>Secure Payment - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Complete your booking payment securely" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-center mb-6">
                <ShieldCheck className="w-12 h-12 text-green-500 mr-3" />
                <h1 className="text-3xl md:text-4xl font-black text-gray-900">Secure Checkout</h1>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{tour.tourName}</h2>
                
                <div className="space-y-3 text-gray-700 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Booking Ref:</span>
                    <span className="font-semibold">{booking.bookingReference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold">{booking.participantName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Participants:</span>
                    <span className="font-semibold">{booking.numberOfParticipants}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Total Amount:</span>
                    <span>€{booking.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-black text-gray-900 bg-white p-3 rounded-lg border border-[#FFD700] shadow-sm">
                    <span>Deposit Due Now (30%):</span>
                    <span className="text-[#FF6B35]">€{depositAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                  <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Payment Policy</p>
                    <p>You're paying <strong>€{depositAmount.toFixed(2)}</strong> now to secure your spot. The remaining balance of <strong>€{remainingAmount.toFixed(2)}</strong> is due 7 days before your tour date. The deposit is non-refundable.</p>
                  </div>
                </div>

                <Button
                  onClick={() => handlePayment(depositAmount)}
                  disabled={paymentLoading}
                  className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <CreditCard className="w-6 h-6 mr-2" />
                  Pay Deposit (€{depositAmount.toFixed(2)})
                </Button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Payments are processed securely by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
