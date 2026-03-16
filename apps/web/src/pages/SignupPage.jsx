import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 8 characters',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.name);
      toast({
        title: 'Account created!',
        description: 'Welcome to Rockin\' Kitchen Sicily'
      });
      navigate('/admin');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup failed',
        description: error.message || 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Rockin' Kitchen Sicily</title>
        <meta name="description" content="Create an account to manage your Sicilian food tour bookings" />
      </Helmet>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-gray-900 to-[#1a1a1a] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2">
              <span className="text-[#FFD700]">Create</span> Account
            </h1>
            <p className="text-gray-400">Join the Sicilian food adventure</p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-900">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 bg-white text-gray-900"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-900">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-white text-gray-900"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-900">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 bg-white text-gray-900"
                  placeholder="••••••••"
                />
                <p className="text-sm text-gray-600 mt-1">Minimum 8 characters</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-900">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 bg-white text-gray-900"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold py-3"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-[#FF6B35] hover:text-[#e55a2a] font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;