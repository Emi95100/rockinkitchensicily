import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Users, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const StreetFoodToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const records = await pb.collection('tours').getFullList({
          sort: 'created',
          $autoCancel: false
        });
        setTours(records);
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast({
          title: 'Error loading tours',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toast]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Loading tours...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Street Food Tours - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Explore authentic Sicilian street food with our guided tours in Catania and Palermo" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Street Food Tours
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover the authentic flavors of Sicily with our expert-guided food tours
            </p>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                {tour.image && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={pb.files.getUrl(tour, tour.image)}
                      alt={tour.tourName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{tour.tourName}</h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{tour.description}</p>

                  <div className="space-y-2 mb-4">
                    {tour.location && (
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 mr-2 text-[#FF6B35]" />
                        <span>{tour.location}</span>
                      </div>
                    )}
                    
                    {tour.startTime && tour.endTime && (
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-2 text-[#FF6B35]" />
                        <span>{tour.startTime} - {tour.endTime}</span>
                      </div>
                    )}

                    {(tour.minParticipants || tour.maxParticipants) && (
                      <div className="flex items-center text-gray-700">
                        <Users className="w-5 h-5 mr-2 text-[#FF6B35]" />
                        <span>
                          {tour.minParticipants && `Min: ${tour.minParticipants}`}
                          {tour.minParticipants && tour.maxParticipants && ' | '}
                          {tour.maxParticipants && `Max: ${tour.maxParticipants}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {tour.meetingPoint && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-semibold text-gray-700">Meeting Point:</p>
                      <p className="text-sm text-gray-600">{tour.meetingPoint}</p>
                    </div>
                  )}

                  {tour.inclusions && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Includes:</p>
                      <p className="text-sm text-gray-600">{tour.inclusions}</p>
                    </div>
                  )}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center text-2xl font-bold text-[#FF6B35]">
                          <Euro className="w-6 h-6" />
                          <span>{tour.price}</span>
                        </div>
                        {tour.depositAmount && (
                          <p className="text-sm text-gray-600">Deposit: €{tour.depositAmount}</p>
                        )}
                      </div>
                    </div>

                    <Link to={`/booking/${tour.id}`}>
                      <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-3">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No tours available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StreetFoodToursPage;