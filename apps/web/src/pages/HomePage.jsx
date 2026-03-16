
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import HomepageStayTeaser from '@/components/HomepageStayTeaser.jsx';

const HomePage = () => {
  const tours = [
    {
      title: 'Catania Street Food',
      description: 'Explore the vibrant markets and authentic street food of Catania',
      image: 'https://horizons-cdn.hostinger.com/c1525780-c7ea-4606-9635-bfc2b66edfdf/7f5b8d1d69834ff93babada2aa29c257.jpg',
      price: '€60',
      duration: '3.5 hours'
    },
    {
      title: 'Palermo Market Tour',
      description: 'Discover the legendary Mercato del Capo and Palermo\'s culinary treasures',
      image: 'https://horizons-cdn.hostinger.com/c1525780-c7ea-4606-9635-bfc2b66edfdf/3877164400d8478fff6016ccafa29840.jpg',
      price: '€70',
      duration: '3 hours'
    },
    {
      title: '9-Day Sicily Experience',
      description: 'Immerse yourself in a luxury journey through Sicily\'s culture and cuisine',
      image: 'https://horizons-cdn.hostinger.com/c1525780-c7ea-4606-9635-bfc2b66edfdf/f2773b8bccb14e32b26c8520563ab4f2.jpg',
      price: '€3,500',
      duration: '9 days'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rockin' Kitchen Sicily - Authentic Sicilian Food Tours</title>
        <meta name="description" content="Experience authentic Sicilian street food and culture with expert-guided tours in Catania and Palermo" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <div 
        className="relative h-[100dvh] bg-cover bg-center"
        style={{ backgroundImage: 'url(https://horizons-cdn.hostinger.com/c1525780-c7ea-4606-9635-bfc2b66edfdf/a9b85bb29c72ad1cd083da21ea0efd09.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight" style={{letterSpacing: '-0.02em'}}>
              <span className="text-[#FF6B35]">Rockin'</span>{' '}
              <span className="text-[#FFD700]">Kitchen</span>{' '}
              <span className="text-white">Sicily</span>
            </h1>
            <p className="text-2xl md:text-4xl text-white mb-8 font-bold">
              Taste the Soul of Sicily
            </p>
            <Link to="/street-food-tours">
              <Button className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-black px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-[#FF6B35]/50 transition-all active:scale-[0.98]">
                Book Your Tour
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Tours Showcase Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
              Our <span className="text-[#FF6B35]">Experiences</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From street food adventures to luxury multi-day journeys
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{tour.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{tour.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-700 mb-6">
                    <div className="flex items-center font-medium">
                      <Clock className="w-4 h-4 mr-2 text-[#FF6B35]" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="text-2xl font-bold text-[#FF6B35]">{tour.price}</div>
                  </div>
                  <Link to="/street-food-tours" className="mt-auto">
                    <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-6 rounded-xl transition-colors active:scale-[0.98]">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stay Teaser Section */}
      <HomepageStayTeaser />

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              Why <span className="text-[#FFD700]">Rock</span> With Us?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🔥</div>
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B35]">Authentic Experiences</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                No tourist traps. We take you where locals actually eat and shop.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🎸</div>
              <h3 className="text-2xl font-bold mb-4 text-[#FFD700]">Expert Guides</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Born and raised in Sicily, we know every corner and every story.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl mb-6">❤️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#FF6B35]">Small Groups</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Intimate experiences with maximum 15 people per tour.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-3xl font-black mb-6">
                <span className="text-[#FF6B35]">Rockin'</span>{' '}
                <span className="text-[#FFD700]">Kitchen</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Authentic Sicilian food tours with rock 'n' roll energy
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700]">Quick Links</h4>
              <div className="space-y-3">
                <Link to="/street-food-tours" className="block text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Street Food Tours
                </Link>
                <Link to="/9-day-experience" className="block text-gray-400 hover:text-[#FF6B35] transition-colors">
                  9-Day Experience
                </Link>
                <Link to="/stay" className="block text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Stay in Sicily
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-[#FF6B35] transition-colors">
                  About Us
                </Link>
                <Link to="/blog" className="block text-gray-400 hover:text-[#FF6B35] transition-colors">
                  Blog
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700]">Follow Us</h4>
              <a 
                href="https://instagram.com/rockinkitchensicily" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-[#FF6B35] transition-colors text-lg"
              >
                <Instagram className="w-6 h-6 mr-3" />
                @rockinkitchensicily
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>&copy; 2026 Rockin' Kitchen Sicily. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
