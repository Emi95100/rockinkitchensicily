import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const Sicily9DayPage = () => {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: '🚧 Booking feature coming soon!',
      description: 'Contact us directly to book this luxury experience'
    });
  };

  const itinerary = [
    {
      day: 1,
      title: 'Arrival in Catania',
      description: 'Welcome to Sicily! Explore the vibrant fish market and baroque architecture of Catania.',
      image: 'https://images.unsplash.com/photo-1702646626532-3665d6488fb9'
    },
    {
      day: 2,
      title: 'Mount Etna Adventure',
      description: '4x4 excursion to Europe\'s highest active volcano. Wine tasting at volcanic vineyards.',
      image: 'https://images.unsplash.com/photo-1607664286949-373200babf7a'
    },
    {
      day: 3,
      title: 'Taormina & Coastal Beauty',
      description: 'Ancient Greek theater, stunning coastal views, and traditional Sicilian lunch.',
      image: 'https://images.unsplash.com/photo-1581371919830-8ec27f28c16e'
    },
    {
      day: 4,
      title: 'Syracuse & Ortigia',
      description: 'Explore ancient Greek ruins and the charming island of Ortigia.',
      image: 'https://images.unsplash.com/photo-1484488126306-693fd007106b'
    },
    {
      day: 5,
      title: 'Ragusa & Baroque Towns',
      description: 'UNESCO World Heritage baroque towns and traditional cooking class.',
      image: 'https://images.unsplash.com/photo-1542904990-d60f68e9af4e'
    },
    {
      day: 6,
      title: 'Agrigento Valley of Temples',
      description: 'Ancient Greek temples and archaeological wonders.',
      image: 'https://images.unsplash.com/photo-1693649517069-d1f3a84a65b8'
    },
    {
      day: 7,
      title: 'Palermo Markets & Street Food',
      description: 'Immerse yourself in Palermo\'s vibrant markets and legendary street food scene.',
      image: 'https://images.unsplash.com/photo-1637945418804-6de0e1ed3c59'
    },
    {
      day: 8,
      title: 'Boat Tour & Coastal Villages',
      description: 'Private boat tour along the stunning Sicilian coast.',
      image: 'https://images.unsplash.com/photo-1702113141732-4eed2d8fff7e'
    },
    {
      day: 9,
      title: 'Farewell Sicily',
      description: 'Final breakfast and departure with unforgettable memories.',
      image: 'https://images.unsplash.com/photo-1542904990-d60f68e9af4e'
    }
  ];

  return (
    <>
      <Helmet>
        <title>9-Day Luxury Sicily Experience - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Immerse yourself in 9 days of authentic Sicilian culture, cuisine, and adventure" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div 
          className="relative h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1607664286949-373200babf7a)' }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                9-Day Luxury Sicily Experience
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8">
                An unforgettable journey through Sicily's culture, cuisine, and breathtaking landscapes
              </p>
              <Button 
                onClick={handleBooking}
                className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold px-12 py-6 text-xl"
              >
                Book This Experience
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-4xl font-black text-gray-900 mb-6">Experience Overview</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Calendar className="w-12 h-12 text-[#FF6B35] mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Duration</h3>
                  <p className="text-gray-600">9 Days / 8 Nights</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Users className="w-12 h-12 text-[#FF6B35] mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Group Size</h3>
                  <p className="text-gray-600">Max 12 People</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Star className="w-12 h-12 text-[#FF6B35] mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">Luxury & Authentic</p>
                </div>
              </div>

              <div className="prose max-w-none text-gray-700">
                <p className="text-lg mb-4">
                  Immerse yourself in the soul of Sicily with our exclusive 9-day luxury experience. 
                  This carefully curated journey takes you from the volcanic landscapes of Mount Etna 
                  to the baroque splendor of Ragusa, from ancient Greek temples to vibrant street markets.
                </p>
                <p className="text-lg mb-4">
                  Experience authentic Sicilian life through hands-on cooking classes, wine tastings at 
                  volcanic vineyards, 4x4 excursions, private boat tours, and intimate encounters with 
                  local artisans and food producers.
                </p>
              </div>

              <div className="mt-8 bg-[#FFD700]/20 border-2 border-[#FFD700] rounded-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    8 nights luxury accommodation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    All meals & wine tastings
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    Private transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    Expert local guides
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    Cooking classes
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    4x4 Etna excursion
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    Private boat tour
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FF6B35] mr-2">✓</span>
                    All entrance fees
                  </li>
                </ul>
              </div>
            </div>

            {/* Detailed Itinerary */}
            <h2 className="text-4xl font-black text-gray-900 mb-8 text-center">Day-by-Day Itinerary</h2>
            
            <div className="space-y-8">
              {itinerary.map((item) => (
                <div key={item.day} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-[#FF6B35] text-white font-bold px-4 py-2 rounded-full mr-3">
                          Day {item.day}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-700 text-lg">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Section */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] rounded-lg shadow-2xl p-8 mt-12 text-center text-white">
              <h2 className="text-4xl font-black mb-4">Investment</h2>
              <div className="text-6xl font-black mb-4">€3,500</div>
              <p className="text-xl mb-6">per person (based on double occupancy)</p>
              <Button 
                onClick={handleBooking}
                className="bg-white text-[#FF6B35] hover:bg-gray-100 font-bold px-12 py-6 text-xl"
              >
                Book This Experience
              </Button>
              <p className="text-sm mt-4 opacity-90">Limited availability - Reserve your spot today</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sicily9DayPage;