import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import Header from '@/components/Header.jsx';

const CancelPage = () => {
  return (
    <>
      <Helmet>
        <title>Payment Cancelled - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Your payment was cancelled" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              
              <h1 className="text-4xl font-black text-gray-900 mb-4">
                Payment Cancelled
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Your payment was not completed. No charges were made.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700">
                  If you experienced any issues during checkout, please contact us or try again.
                </p>
              </div>

              <div className="space-y-4">
                <Link to="/street-food-tours">
                  <Button className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-3">
                    Try Again
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 font-bold py-3">
                    Back to Home
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

export default CancelPage;