
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import StreetFoodToursPage from '@/pages/StreetFoodToursPage.jsx';
import BookingPage from '@/pages/BookingPage.jsx';
import PaymentPage from '@/pages/PaymentPage.jsx';
import SuccessPage from '@/pages/SuccessPage.jsx';
import CancelPage from '@/pages/CancelPage.jsx';
import Sicily9DayPage from '@/pages/Sicily9DayPage.jsx';
import StayPage from '@/pages/StayPage.jsx';
import AboutUsPage from '@/pages/AboutUsPage.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import BlogDetailPage from '@/pages/BlogDetailPage.jsx';
import GalleryPage from '@/pages/GalleryPage.jsx';
import AdminBookingsPage from '@/pages/AdminBookingsPage.jsx';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/street-food-tours" element={<StreetFoodToursPage />} />
          <Route path="/booking/:tourId" element={<BookingPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/9-day-experience" element={<Sicily9DayPage />} />
          <Route path="/stay" element={<StayPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminBookingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute>
                <AdminBookingsPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
