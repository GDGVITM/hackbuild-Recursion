import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, HelpCircle, LayoutDashboard, Menu, X, BarChart3 } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { formatDistanceToNow } from 'date-fns';

const EventsList = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        console.log("📦 Data from backend:", data);
        setEvents(data);
      } catch (error) {
        console.error("❌ Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search + category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || (event.categories && event.categories.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  // User role logic
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'theeventhub2025@gmail.com';
  const isOrganiser = user?.primaryEmailAddress?.emailAddress === 'aravmahind05@gmail.com';

  const getRedirectUrl = () => {
    if (isAdmin) return '/admin/dashboard';
    if (isOrganiser) return '/organiser/dashboard';
    return '/user/dashboard';
  };

  const getUserRole = () => {
    if (isAdmin) return 'Admin';
    if (isOrganiser) return 'Organiser';
    return 'User';
  };

  const getRoleBadgeColor = () => {
    if (isAdmin) return 'bg-purple-100 text-purple-700';
    if (isOrganiser) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  const categories = ["All", "Technology", "Business", "Education", "Health & Wellness"];

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

        {/* Auth & User */}
        <div className="hidden lg:flex items-center space-x-6">
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
              <UserButton />
              <div>
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

      {/* Hero */}
      <main className="px-4 sm:px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Discover Amazing{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Campus Events
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-8 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
          Join thousands of students in exploring workshops, conferences, cultural events, and networking opportunities right on your campus.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Input
            type="text"
            placeholder="Search events, categories, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl"
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'border-2 border-gray-200 text-gray-700 hover:border-blue-300 hover:text-blue-600'
                }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </main>

      {/* Event Listing */}
      <section className="px-6 pb-16">
                {(!filteredEvents || filteredEvents.length === 0) ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredEvents
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
              .map((event) => {
                const timeAgo = event?.createdAt
                  ? formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })
                  : "";

                return (
                  <div
                    key={event._id}
                    className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden relative"
                  >
                    {/* Image */}
                    <div className="h-40 w-full bg-gray-200">
                      <img
                        src={event.image || "https://via.placeholder.com/400x200.png?text=Event"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>

                      <div className="mt-3 text-sm text-gray-500 space-y-1">
                        <p>📍 {event.location || "TBA"}</p>
                        <p>👥 Max Attendees: {event.maxAttendees || "Unlimited"}</p>
                        <p>🗓 {new Date(event.startTime).toLocaleDateString()}</p>
                      </div>

                      {/* Category badges */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(event.categories || []).map((cat) => (
                          <Badge key={cat} className="bg-blue-100 text-blue-700">{cat}</Badge>
                        ))}
                      </div>

                      {/* Time ago */}
                      {timeAgo && (
                        <p className="mt-2 text-xs text-gray-400 italic">{timeAgo}</p>
                      )}
                    </div>

                    {/* Floating View Button */}
                    <button
                      className="absolute bottom-3 right-3 bg-indigo-500 text-white px-3 py-1 rounded-full shadow hover:bg-indigo-600 text-xs font-medium transition"
                      onClick={() => {
                        if (!user) {
                          navigate("/auth/login");
                          return;
                        }
                        navigate(`/events/${event._id}`);
                      }}
                    >
                      View
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button size="icon" className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <HelpCircle className="w-6 h-6 text-white" />
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
                <Link to="/events" className="block text-gray-400 hover:text-white text-sm">Browse Events</Link>
                <Link to="/stats" className="block text-gray-400 hover:text-white text-sm">Event Statistics</Link>
                <Link to="/payment" className="block text-gray-400 hover:text-white text-sm">Make Payment</Link>
                <Link to="/" className="block text-gray-400 hover:text-white text-sm">About Us</Link>
                <Link to="/" className="block text-gray-400 hover:text-white text-sm">Contact Support</Link>
              </div>
            </div>

            {/* Legal & Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Legal & Policies</h4>
              <div className="space-y-2">
                <Link to="/terms-conditions" className="block text-gray-400 hover:text-white text-sm">Terms & Conditions</Link>
                <Link to="/privacy" className="block text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
                <Link to="/cancellation-refunds" className="block text-gray-400 hover:text-white text-sm">Cancellation & Refunds</Link>
                <Link to="/shipping" className="block text-gray-400 hover:text-white text-sm">Shipping Policy</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Email: support@eventhub.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Event Street, Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 EventHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white">Terms</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link to="/cancellation-refunds" className="text-gray-400 hover:text-white">Refunds</Link>
              <Link to="/shipping" className="text-gray-400 hover:text-white">Shipping</Link>
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

export default EventsList;

