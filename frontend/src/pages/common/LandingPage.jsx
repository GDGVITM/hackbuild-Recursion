import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, ArrowRight, HelpCircle, BarChart3, LayoutDashboard, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const LandingPage = () => {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is admin or organiser based on email - fix the email access
  console.log(user?.primaryEmailAddress?.emailAddress);
  
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'theeventhub2025@gmail.com';
  const isOrganiser = user?.primaryEmailAddress?.emailAddress === 'aravmahind05@gmail.com';

  console.log(isAdmin);
  
  // Debug logging
  console.log('User object:', user);
  console.log('User email:', user?.primaryEmailAddress?.emailAddress);
  console.log('Is admin:', isAdmin);
  console.log('Is organiser:', isOrganiser);
  
  // Determine redirect URL based on user role
  const getRedirectUrl = () => {
    if (isAdmin) {
      return '/admin/dashboard';
    } else if (isOrganiser) {
      return '/organiser/dashboard';
    }
    return '/user/dashboard';
  };

  // Get user role for display
  const getUserRole = () => {
    if (isAdmin) return 'Admin';
    if (isOrganiser) return 'Organiser';
    return 'User';
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    if (isAdmin) return 'bg-purple-100 text-purple-700';
    if (isOrganiser) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  const categories = ['All', 'Technology', 'Cultural', 'Business', 'Science', 'Career', 'Entertainment'];
  
  const featuredEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      category: 'Technology',
      status: 'Open',
      background: 'bg-gradient-to-br from-slate-800 to-slate-900',
      speckles: 'bg-white/10'
    },
    {
      id: 2,
      title: 'Cultural Festival',
      category: 'Cultural',
      status: 'Open',
      background: 'bg-gradient-to-br from-slate-800 to-slate-900',
      speckles: 'bg-white/10'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">EventHub</h1>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Event & Campus Management</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex space-x-6">
            <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link 
              to={getRedirectUrl()} 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>
                {isAdmin ? 'Admin Dashboard' : 
                 isOrganiser ? 'Organiser Dashboard' : 
                 'Dashboard'}
              </span>
            </Link>
            <Link to="/stats" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Stats</span>
            </Link>
          </nav>
          
          {/* Authentication Section */}
          <SignedOut>
            <div className="flex items-center space-x-3">
              <Link to="/auth/login">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span className="font-medium text-sm sm:text-base">Get Started</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center space-x-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                    userButtonPopoverCard: "shadow-xl border border-gray-200",
                    userButtonPopoverActionButton: "hover:bg-gray-50"
                  }
                }}
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName || user?.fullName || 'User'}
                </p>
                {(isAdmin || isOrganiser) && (
                  <Badge className={`${getRoleBadgeColor()} text-xs mt-1`}>
                    {getUserRole()}
                  </Badge>
                )}
              </div>
            </div>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-3">
          <SignedOut>
            <div className="flex items-center space-x-2">
              <Link to="/auth/login">
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 text-xs">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg text-xs">
                  Get Started
                </Button>
              </Link>
            </div>
          </SignedOut>
          
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-xl border border-gray-200",
                  userButtonPopoverActionButton: "hover:bg-gray-50"
                }
              }}
            />
          </SignedIn>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
            <nav className="px-4 py-4 space-y-3">
              <Link 
                to="/events" 
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>
              <Link 
                to={getRedirectUrl()} 
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>
                  {isAdmin ? 'Admin Dashboard' : 
                   isOrganiser ? 'Organiser Dashboard' : 
                   'Dashboard'}
                </span>
              </Link>
              <Link 
                to="/stats" 
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Stats</span>
              </Link>
              
              <SignedIn>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    {user?.firstName || user?.fullName || 'User'}
                  </p>
                  {(isAdmin || isOrganiser) && (
                    <Badge className={`${getRoleBadgeColor()} text-xs`}>
                      {getUserRole()}
                    </Badge>
                  )}
                </div>
              </SignedIn>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="px-4 sm:px-6 py-8 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campus
            </span>{' '}
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of students in exploring workshops, conferences, cultural events, and networking opportunities right on your campus.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder="Search events, categories, or keywords..."
              className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-4">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  index === 0 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* Featured Events Section */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-6 sm:mb-8">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Events</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:space-x-6 gap-4 lg:gap-0 lg:overflow-x-auto pb-4 scrollbar-hide">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="lg:min-w-[300px] border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className={`relative w-full h-48 sm:h-56 lg:w-[300px] lg:h-[200px] rounded-xl overflow-hidden ${event.background}`}>
                    {/* Abstract background with speckles */}
                    <div className={`absolute inset-0 ${event.speckles} opacity-20`} 
                         style={{
                           backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 1px, transparent 1px)',
                           backgroundSize: '20px 20px'
                         }} />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs sm:text-sm">
                        {event.status}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                        {event.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <Button
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">EventHub</h3>
                  <p className="text-sm text-gray-400">Event & Campus Management</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connecting students with amazing campus events, workshops, and networking opportunities.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/events" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Browse Events
                </Link>
                <Link to="/stats" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Event Statistics
                </Link>
                <Link to="/payment" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Make Payment
                </Link>
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Legal & Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal & Policies</h4>
              <div className="space-y-2">
                <Link to="/terms-conditions" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
                <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
                <Link to="/cancellation-refunds" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Cancellation & Refunds
                </Link>
                <Link to="/shipping" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping Policy
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: support@eventhub.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Event Street</p>
                <p>Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 EventHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/cancellation-refunds" className="text-gray-400 hover:text-white transition-colors">
                Refunds
              </Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                Shipping
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

