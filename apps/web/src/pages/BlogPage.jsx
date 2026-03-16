import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const categories = ['all', 'Sicilian Food Culture', 'Travel Tips', 'Traditional Recipes'];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const filter = selectedCategory === 'all' ? '' : `category = "${selectedCategory}"`;
        const records = await pb.collection('blog_posts').getList(1, 50, {
          sort: '-publishDate',
          filter: filter,
          $autoCancel: false
        });
        setPosts(records.items);
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Error loading blog posts',
          description: 'Please try again later',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, toast]);

  return (
    <>
      <Helmet>
        <title>Blog - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Discover Sicilian food culture, travel tips, and traditional recipes" />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FFD700] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4">Our Blog</h1>
            <p className="text-xl md:text-2xl">Stories, recipes, and insights from Sicily</p>
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
                {category === 'all' ? 'All Posts' : category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No posts found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                >
                  {post.featuredImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={pb.files.getUrl(post, post.featuredImage)}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block bg-[#FFD700] text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-3">
                        {post.category}
                      </span>
                    )}
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      {post.author && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span>{post.author}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;