
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import BnBCard from '@/components/BnBCard.jsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CITIES = ['All Cities', 'Catania', 'Palermo', 'Taormina', 'Syracuse', 'Ragusa', 'Agrigento'];
const PRICE_RANGES = ['All Prices', '€0-50', '€50-100', '€100-150', '€150+'];
const AMENITIES = ['WiFi', 'Pool', 'Kitchen', 'AC', 'Parking', 'Breakfast'];

const StayPage = () => {
  const [bnbs, setBnbs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchBnbs = async () => {
      try {
        const records = await pb.collection('bnb_partners').getFullList({
          filter: 'active = true',
          sort: '-rating',
          $autoCancel: false
        });
        setBnbs(records);
      } catch (error) {
        console.error('Error fetching BnBs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBnbs();
  }, []);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('All Cities');
    setSelectedPrice('All Prices');
    setSelectedAmenities([]);
  };

  // Filter Logic
  const filteredBnbs = bnbs.filter(bnb => {
    // Search
    const matchesSearch = 
      bnb.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bnb.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    // City
    const matchesCity = selectedCity === 'All Cities' || bnb.city === selectedCity;
    
    // Price (Simple string matching for this demo, assuming priceRange matches our dropdown format roughly)
    let matchesPrice = true;
    if (selectedPrice !== 'All Prices') {
      // Extract numbers from bnb.priceRange (e.g. "€80-120/night" -> 80)
      const priceMatch = bnb.priceRange.match(/\d+/);
      if (priceMatch) {
        const price = parseInt(priceMatch[0]);
        if (selectedPrice === '€0-50') matchesPrice = price <= 50;
        else if (selectedPrice === '€50-100') matchesPrice = price > 50 && price <= 100;
        else if (selectedPrice === '€100-150') matchesPrice = price > 100 && price <= 150;
        else if (selectedPrice === '€150+') matchesPrice = price > 150;
      }
    }

    // Amenities
    let matchesAmenities = true;
    if (selectedAmenities.length > 0) {
      let bnbAmenities = [];
      try {
        bnbAmenities = typeof bnb.amenities === 'string' ? JSON.parse(bnb.amenities) : (bnb.amenities || []);
      } catch (e) {}
      
      matchesAmenities = selectedAmenities.every(a => bnbAmenities.includes(a));
    }

    return matchesSearch && matchesCity && matchesPrice && matchesAmenities;
  });

  const hasActiveFilters = searchQuery || selectedCity !== 'All Cities' || selectedPrice !== 'All Prices' || selectedAmenities.length > 0;

  return (
    <>
      <Helmet>
        <title>Stay in Sicily | Rockin' Kitchen Sicily</title>
        <meta name="description" content="Discover handpicked BnB accommodations and partner hotels across Sicily. Book your perfect stay in Catania, Palermo, Taormina, and more." />
        <meta property="og:title" content="Stay in Sicily | Rockin' Kitchen Sicily" />
        <meta property="og:description" content="Discover handpicked BnB accommodations and partner hotels across Sicily." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />
      
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <div className="bg-[#1a1a1a] text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF6B35] via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black mb-4"
            >
              Find Your <span className="text-[#FFD700]">Perfect Stay</span> in Sicily
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-6"
            >
              Handpicked accommodations from our trusted partners
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 text-sm text-gray-300"
            >
              Note: Bookings are completed securely on our partners' websites.
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-20">
          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
              <div className="md:col-span-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input 
                  placeholder="Search by name or city..." 
                  className="pl-10 bg-gray-50 border-transparent focus-visible:ring-[#FF6B35]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="md:col-span-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="bg-gray-50 border-transparent focus:ring-[#FF6B35]">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-4">
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                  <SelectTrigger className="bg-gray-50 border-transparent focus:ring-[#FF6B35]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRICE_RANGES.map(price => (
                      <SelectItem key={price} value={price}>{price}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-500 mr-2 flex items-center">
                  <Filter className="w-4 h-4 mr-1" /> Amenities:
                </span>
                {AMENITIES.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-[#FF6B35] text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-gray-900 h-8 px-3"
                >
                  <X className="w-4 h-4 mr-1" /> Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-56 w-full rounded-2xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ))}
            </div>
          ) : filteredBnbs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-6xl mb-4">🏜️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No stays found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
              <Button onClick={clearFilters} className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredBnbs.map((bnb) => (
                  <motion.div
                    key={bnb.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BnBCard bnb={bnb} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default StayPage;
