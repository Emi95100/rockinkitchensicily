import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('blog_posts').getOne(id, { $autoCancel: false });
        setPost(record);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: 'Error loading post',
          description: 'Post not found',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, toast]);

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

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-2xl text-gray-600">Post not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${post.title} - Rockin' Kitchen Sicily`}</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog">
              <Button variant="outline" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {post.featuredImage && (
                <div className="h-96 overflow-hidden">
                  <img
                    src={pb.files.getUrl(post, post.featuredImage)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 md:p-12">
                {post.category && (
                  <span className="inline-block bg-[#FFD700] text-gray-900 text-sm font-bold px-4 py-2 rounded-full mb-4">
                    {post.category}
                  </span>
                )}

                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  {post.title}
                </h1>

                <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  {post.author && (
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span>{post.author}</span>
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </div>
              </div>
            </article>

            <div className="mt-8 text-center">
              <Link to="/blog">
                <Button className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold">
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;