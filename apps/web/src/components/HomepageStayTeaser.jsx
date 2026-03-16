
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import BnBCard from '@/components/BnBCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';

const HomepageStayTeaser = () => {
  const [bnbs, setBnbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBnbs = async () => {
      try {
        const records = await pb.collection('bnb_partners').getList(1, 3, {
          filter: 'active = true',
          sort: '-rating',
          $autoCancel: false
        });
        setBnbs(records.items);
      } catch (error) {
        console.error('Error fetching BnBs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBnbs();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Find Your <span className="text-[#FFD700]">Perfect Stay</span>
            </h2>
            <p className="text-lg text-gray-600">
              Complete your Sicilian experience with our handpicked selection of partner accommodations, from historic city lofts to coastal retreats.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link to="/stay">
              <Button variant="outline" className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white font-bold px-6 py-6 text-base rounded-full transition-all">
                Explore All Accommodations
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-56 w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))
          ) : (
            bnbs.map((bnb, index) => (
              <motion.div
                key={bnb.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BnBCard bnb={bnb} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepageStayTeaser;
