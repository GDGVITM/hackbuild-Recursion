import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Bell, 
  QrCode, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  Clock,
  TrendingUp,
  HelpCircle,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { useLogout } from '@/hooks/useLogout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user: authUser } = useAuth();
  const { user: clerkUser } = useUser();
  const { logout } = useLogout();
  const user = authUser || clerkUser;
  const userName = user?.name || user?.firstName || user?.fullName || 'User';
  const userRole = user?.role || 'Student';

  const upcomingEvents = [
    { id: 1, title: 'Tech Innovation Summit 2024', date: 'March 15, 2024', time: '9:00 AM', location: 'Engineering Auditorium', status: 'Registered' },
    { id: 2, title: 'Spring Concert Series', date: 'April 18, 2024', time: '7:00 PM', location: 'Campus Amphitheater', status: 'Registered' }
  ];

  const recentActivity = [
    { id: 1, event: 'Tech Innovation Summit 2024', action: 'Registered on Feb 20, 2024', status: 'upcoming' },
    { id: 2, event: 'Annual Cultural Fest', action: 'Registered on Feb 18, 2024', status: 'upcoming' },
    { id: 3, event: 'Science Exhibition', action: 'Registered on March 1, 2024', status: 'upcoming' }
  ];

  const quickAccessCards = [
    { icon: Calendar, title: 'Browse Events', description: 'Find new events', color: 'text-blue-600', link: '/events' },
    { icon: QrCode, title: 'My Tickets', description: 'QR codes & passes', color: 'text-orange-500', link: '/user/my-tickets' },
    { icon: Bell, title: 'Notifications', description: '3 new', color: 'text-purple-600', link: '#' },
    { icon: BookOpen, title: 'My Calendar', description: 'View schedule', color: 'text-green-600', link: '#' }
  ];

  const userStats = {
    totalEvents: upcomingEvents.length + recentActivity.length,
    upcomingEvents: upcomingEvents.length,
    notifications: 3
  };

  const getRoleBadgeColor = () => {
    switch (userRole.toLowerCase()) {
      case 'admin': return 'bg-purple-100 text-purple-700';
      case 'organizer': return 'bg-orange-100 text-orange-700';
      case 'volunteer': return 'bg-green-100 text-green-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Desktop Nav */}
            <div className="flex items-center space-x-4 sm:space-x-8">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">EventHub</h1>
              </div>

              {/* Desktop Navigation Links */}
              <nav className="hidden lg:flex space-x-6 items-center justify-center">
                <Link to="/events" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Browse Events</span>
                </Link>
                <Link to="/user/my-events" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>My Events</span>
                </Link>
                <Link to="/user/my-tickets" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>My Tickets</span>
                </Link>
              </nav>
            </div>

            {/* Right Side - Notifications & Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <Badge className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 text-white text-xs rounded-full">3</Badge>
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
              <Link to="/events" className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2">
                <Calendar className="w-4 h-4" />
                <span>Browse Events</span>
              </Link>
              <Link to="/user/my-events" className="block bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>My Events</span>
              </Link>
              <Link to="/user/my-tickets" className="block text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2 py-2">
                <QrCode className="w-4 h-4" />
                <span>My Tickets</span>
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <Badge className={`${getRoleBadgeColor()} px-3 py-1 rounded-full flex items-center space-x-1 mt-1`}>
                  <GraduationCap className="w-3 h-3" />
                  <span>{userRole}</span>
                </Badge>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-sm mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <span className="text-2xl sm:text-3xl">🎓</span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, {userName}!</h2>
                  <p className="text-sm sm:text-base text-gray-600">You have {userStats.upcomingEvents} upcoming events and {userStats.notifications} new notifications.</p>
                </div>
              </div>
              <div className="hidden md:flex space-x-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{userStats.totalEvents}</p>
                  <p className="text-sm text-gray-600">Events Registered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">{userStats.upcomingEvents}</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {quickAccessCards.map((card, index) => (
            <Link to={card.link || '#'} key={index}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 sm:p-6 text-center">
                  <card.icon className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 ${card.color}`} />
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-xs sm:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-xs sm:text-sm">My Tickets</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-xs sm:text-sm">History</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 text-xs sm:text-sm">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader className="flex items-center space-x-2 pb-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <CardTitle className="text-lg sm:text-xl">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 space-y-2 sm:space-y-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{event.title}</h4>
                        <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm w-fit">Registered</Badge>
                      </div>
                      <div className="space-y-2 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button variant="outline" size="sm" className="text-xs sm:text-sm">View Details</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                          <QrCode className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          Show Ticket
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex items-center space-x-2 pb-3">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-200 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm sm:text-base">{activity.event}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 text-xs w-fit">upcoming</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 text-sm">View All Activity</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-center text-gray-500 text-sm sm:text-base">Tickets content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-center text-gray-500 text-sm sm:text-base">History content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <p className="text-center text-gray-500 text-sm sm:text-base">Notifications content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Help Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <Button size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-gray-900 shadow-lg">
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
