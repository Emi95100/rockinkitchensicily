
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Calendar, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/street-food-tours', label: 'Street Food Tours' },
    { to: '/9-day-experience', label: '9-Day Experience' },
    { to: '/stay', label: 'Stay' },
    { to: '/about', label: 'About Us' },
    { to: '/blog', label: 'Blog' },
    { to: '/gallery', label: 'Gallery' },
  ];

  return (
    <header className="bg-[#1a1a1a] text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-black tracking-tight">
              <span className="text-[#FF6B35]">Rockin'</span>{' '}
              <span className="text-[#FFD700]">Kitchen</span>{' '}
              <span className="text-white">Sicily</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors font-medium text-sm xl:text-base ${
                    isActive ? 'text-[#FFD700]' : 'text-gray-300 hover:text-[#FF6B35]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {!currentUser ? (
              <Link to="/login">
                <Button className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold">
                  Admin Login
                </Button>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-[#FF6B35] text-white hover:bg-[#FF6B35]/10">
                    <User className="w-4 h-4 mr-2" />
                    {currentUser.name || currentUser.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-gray-700">
                  <DropdownMenuItem 
                    onClick={() => navigate('/admin/bookings')}
                    className="text-white hover:bg-[#FF6B35]/20 cursor-pointer"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-white hover:bg-[#FF6B35]/20 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`transition-colors font-medium ${
                      isActive ? 'text-[#FFD700]' : 'text-gray-300 hover:text-[#FF6B35]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {!currentUser ? (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#FF6B35] hover:bg-[#e55a2a] text-white font-bold w-full mt-4">
                    Admin Login
                  </Button>
                </Link>
              ) : (
                <div className="pt-4 border-t border-gray-700 flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      navigate('/admin/bookings');
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-300 hover:text-[#FF6B35] transition-colors font-medium flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-300 hover:text-[#FF6B35] transition-colors font-medium flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
