import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, HelpCircle, LayoutDashboard, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const LandingPage = () => {
  const { user } = useUser();
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
      selectedCategory === 'All' || event.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // User role stuff
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
            <SignInButton mode="modal" afterSignInUrl={getRedirectUrl()}>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 rounded-xl shadow-lg">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </SignInButton>
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

        {/* Mobile menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Hero */}
      <main className="px-4 sm:px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
          Discover Amazing{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Campus Events
          </span>
          <p className="text-lg sm:text-xl text-gray-600 mt-8 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Join thousands of students in exploring workshops, conferences, cultural events, and networking opportunities right on your campus.
          </p>
        </h1>

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

      {/* Events Section */}
      <section className="px-6 pb-16">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
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
                    {event.categories.map((cat) => (
                      <Badge key={cat} className="bg-blue-100 text-blue-700">{cat}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
