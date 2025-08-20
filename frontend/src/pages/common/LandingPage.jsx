import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, ArrowRight, HelpCircle, BarChart3, LayoutDashboard } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const LandingPage = () => {
  const { user } = useUser();

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
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">EventHub</h1>
            <p className="text-sm text-gray-600">Event & Campus Management</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6">
            <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link 
              to="/user/dashboard" 
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/stats" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Stats</span>
            </Link>
          </nav>
          
          {/* Authentication Section */}
          <SignedOut>
            <SignInButton mode="modal" afterSignInUrl="/user/dashboard">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="font-medium">Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center space-x-3">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl border border-gray-200",
                    userButtonPopoverActionButton: "hover:bg-gray-50"
                  }
                }}
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName || user?.fullName || 'User'}
                </p>
              </div>
            </div>
          </SignedIn>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Campus
            </span>{' '}
            <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students in exploring workshops, conferences, cultural events, and networking opportunities right on your campus.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search events, categories, or keywords..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
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
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="min-w-[300px] border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className={`relative w-[300px] h-[200px] rounded-xl overflow-hidden ${event.background}`}>
                    {/* Abstract background with speckles */}
                    <div className={`absolute inset-0 ${event.speckles} opacity-20`} 
                         style={{
                           backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 1px, transparent 1px)',
                           backgroundSize: '20px 20px'
                         }} />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 hover:bg-green-600 text-white border-0">
                        {event.status}
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
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
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

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

