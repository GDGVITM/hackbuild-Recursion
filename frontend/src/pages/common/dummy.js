import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, ArrowRight, HelpCircle, BarChart3, LayoutDashboard, Menu, X, ExternalLink, Users, MapPin, Clock } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const LandingPage = () => {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Check if user is admin or organiser based on email
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'theeventhub2025@gmail.com';
  const isOrganiser = user?.primaryEmailAddress?.emailAddress === 'aravmahind05@gmail.com';
  
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
    if (isAdmin) return 'bg-purple-600 text-white';
    if (isOrganiser) return 'bg-orange-500 text-white';
    return 'bg-blue-600 text-white';
  };

  const categories = ['All', 'Technology', 'Cultural', 'Business', 'Science', 'Career', 'Entertainment'];
  
  const featuredEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      category: 'Technology',
      status: 'Open',
      date: 'Oct 15, 2024',
      time: '9:00 AM - 5:00 PM',
      location: 'University Auditorium',
      attendees: 240,
      background: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      image: 'tech-event'
    },
    {
      id: 2,
      title: 'Cultural Festival',
      category: 'Cultural',
      status: 'Open',
      date: 'Nov 5, 2024',
      time: '2:00 PM - 10:00 PM',
      location: 'Main Campus Grounds',
      attendees: 500,
      background: 'bg-gradient-to-br from-amber-500 to-orange-600',
      image: 'cultural-event'
    },
    {
      id: 3,
      title: 'Business Summit',
      category: 'Business',
      status: 'Coming Soon',
      date: 'Dec 12, 2024',
      time: '10:00 AM - 4:00 PM',
      location: 'Business School Hall',
      attendees: 180,
      background: 'bg-gradient-to-br from-emerald-500 to-teal-700',
      image: 'business-event'
    }
  ];

  const stats = [
    { value: '500+', label: 'Events Hosted' },
    { value: '25k+', label: 'Students Joined' },
    { value: '50+', label: 'Campuses' },
    { value: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
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
            <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 group">
              <Calendar className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">Events</span>
            </Link>
            <Link 
              to={getRedirectUrl()} 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 group"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">
                {isAdmin ? 'Admin Dashboard' : 
                 isOrganiser ? 'Organiser Dashboard' : 
                 'Dashboard'}
              </span>
            </Link>
            <Link to="/stats" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 group">
              <BarChart3 className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">Stats</span>
            </Link>
          </nav>
          
          {/* Authentication Section */}
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl={getRedirectUrl()}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <span className="font-medium text-sm sm:text-base">Get Started</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center space-x-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-white shadow-md",
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
                  <Badge className={`${getRoleBadgeColor()} text-xs mt-1 px-2 py-0.5`}>
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
            <SignInButton mode="modal" afterSignInUrl={getRedirectUrl()}>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg text-xs shadow-md">
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-2 ring-white shadow-md",
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
            className="lg:hidden rounded-full"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl lg:hidden z-50 animate-in slide-in-from-top">
            <nav className="px-4 py-4 space-y-3">
              <Link 
                to="/events" 
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>
              <Link 
                to={getRedirectUrl()} 
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2 px-2 rounded-lg hover:bg-gray-50"
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
                className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2 px-2 rounded-lg hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Stats</span>
              </Link>
              
              <SignedIn>
                <div className="pt-3 border-t border-gray-200 px-2">
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
      <main className="px-4 sm:px-6 py-8 sm:py-16 text-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
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
              className="w-full pl-12 pr-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all shadow-lg"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === category 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
                    : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 py-12 bg-gradient-to-r from-blue-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-white/80 rounded-xl shadow-sm border border-white backdrop-blur-sm">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-yellow-200" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Events</h2>
            </div>
            <Link to="/events" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
              <span>View all</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className={`relative w-full h-48 ${event.background} overflow-hidden`}>
                    {/* Event image placeholder with pattern */}
                    <div className="absolute inset-0 opacity-20 bg-repeat" 
                         style={{
                           backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                         }} />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={
                        event.status === 'Open' 
                          ? 'bg-green-500 hover:bg-green-600 text-white border-0' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white border-0'
                      }>
                        {event.status}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        {event.category}
                      </Badge>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Explore Campus Events?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students discovering amazing events on campus. Sign up now to never miss out on exciting opportunities.
          </p>
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl={getRedirectUrl()}>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg font-medium rounded-xl shadow-lg">
                Get Started Now
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link to={getRedirectUrl()}>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-lg font-medium rounded-xl shadow-lg">
                Go to Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Help Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all hover:rotate-12"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-gray-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">EventHub</h3>
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
              <div className="space-y-3">
                <Link to="/events" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Browse Events
                </Link>
                <Link to="/stats" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Event Statistics
                </Link>
                <Link to="/payment" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Make Payment
                </Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
                <Link to="/support" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Legal & Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal & Policies</h4>
              <div className="space-y-3">
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
              <div className="space-y-3 text-sm text-gray-400">
                <p>Email: support@eventhub.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Event Street</p>
                <p>Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
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
    </div>
  );
};

export default LandingPage;