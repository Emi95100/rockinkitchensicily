import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import TourBookingForm from '@/components/TourBookingForm.jsx';

const BookingPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const record = await pb.collection('tours').getOne(tourId, { $autoCancel: false });
        setTour(record);
      } catch (error) {
        console.error('Error fetching tour:', error);
        toast({
          title: 'Error loading tour',
          description: 'Tour not found',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [tourId, toast]);

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

  if (!tour) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Tour not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Book ${tour.tourName} - Rockin' Kitchen Sicily`}</title>
        <meta name="description" content={`Book your spot on ${tour.tourName}`} />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-4">{tour.tourName}</h1>
              <p className="text-gray-600 text-lg mb-4">{tour.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <span className="font-semibold">Location:</span> {tour.location}
                </div>
                <div>
                  <span className="font-semibold">Time:</span> {tour.startTime} - {tour.endTime}
                </div>
                <div>
                  <span className="font-semibold">Price:</span> €{tour.price} per person
                </div>
                {tour.depositAmount && (
                  <div>
                    <span className="font-semibold">Deposit:</span> €{tour.depositAmount}
                  </div>
                )}
              </div>
            </div>

            <TourBookingForm tour={tour} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;