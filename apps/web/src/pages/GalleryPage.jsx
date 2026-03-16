import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', 'Markets', 'Food', 'Participants', 'Landscapes'];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const filter = selectedCategory === 'all' ? '' : `category = "${selectedCategory}"`;
        const records = await pb.collection('gallery').getFullList({
          sort: '-created',
          filter: filter,
          $autoCancel: false
        });
        setImages(records);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast({
          title: 'Error loading gallery',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [selectedCategory, toast]);

  return (
    <>
      <Helmet>
        <title>Gallery - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Explore our photo gallery of Sicilian markets, food, and unforgettable moments" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">Gallery</h1>
            <p className="text-xl md:text-2xl">Moments captured from our Sicilian adventures</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Photos' : category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading gallery...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No images found</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={pb.files.getUrl(image, image.image)}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-300"
                  />
                  {image.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                      {image.description && (
                        <p className="text-white/90 text-sm">{image.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="max-w-6xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={pb.files.getUrl(selectedImage, selectedImage.image)}
                alt={selectedImage.title || 'Gallery image'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              {selectedImage.title && (
                <div className="bg-white p-4 mt-4 rounded-lg">
                  <h3 className="text-gray-900 font-bold text-xl mb-2">{selectedImage.title}</h3>
                  {selectedImage.description && (
                    <p className="text-gray-700">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;