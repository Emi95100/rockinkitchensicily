
import React from 'react';
import { MapPin, Star, Wifi, Waves, Utensils, Wind, Car, Coffee, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';

const amenityIcons = {
  'WiFi': Wifi,
  'Pool': Waves,
  'Kitchen': Utensils,
  'AC': Wind,
  'Parking': Car,
  'Breakfast': Coffee
};

const BnBCard = ({ bnb }) => {
  const imageUrl = bnb.image 
    ? pb.files.getUrl(bnb, bnb.image) 
    : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';

  // Parse amenities if it's a string, or use directly if array
  let amenitiesList = [];
  try {
    amenitiesList = typeof bnb.amenities === 'string' ? JSON.parse(bnb.amenities) : (bnb.amenities || []);
  } catch (e) {
    amenitiesList = [];
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={bnb.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {bnb.rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center shadow-sm">
            <Star className="w-4 h-4 text-[#FFD700] fill-[#FFD700] mr-1" />
            <span className="font-bold text-gray-900 text-sm">{bnb.rating}</span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{bnb.name}</h3>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 text-[#FF6B35]" />
          <span>{bnb.city}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {bnb.description}
        </p>
        
        {amenitiesList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {amenitiesList.slice(0, 4).map((amenity, idx) => {
              const Icon = amenityIcons[amenity] || Star;
              return (
                <div key={idx} className="flex items-center bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">
                  <Icon className="w-3 h-3 mr-1" />
                  {amenity}
                </div>
              );
            })}
            {amenitiesList.length > 4 && (
              <div className="flex items-center bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-md border border-gray-100">
                +{amenitiesList.length - 4}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Per Night</p>
            <p className="text-lg font-bold text-[#FF6B35]">{bnb.priceRange}</p>
          </div>
          
          <Button 
            onClick={() => window.open(bnb.externalUrl, '_blank')}
            className="bg-[#1a1a1a] hover:bg-gray-800 text-white transition-colors"
          >
            Visit & Book
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BnBCard;
