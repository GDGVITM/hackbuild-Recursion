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
  ChevronDown, 
  MapPin, 
  Clock,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'Engineering Auditorium',
      status: 'Registered'
    },
    {
      id: 2,
      title: 'Spring Concert Series',
      date: 'April 18, 2024',
      time: '7:00 PM',
      location: 'Campus Amphitheater',
      status: 'Registered'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      event: 'Tech Innovation Summit 2024',
      action: 'Registered on Feb 20, 2024',
      status: 'upcoming'
    },
    {
      id: 2,
      event: 'Annual Cultural Fest',
      action: 'Registered on Feb 18, 2024',
      status: 'upcoming'
    },
    {
      id: 3,
      event: 'Science Exhibition',
      action: 'Registered on March 1, 2024',
      status: 'upcoming'
    }
  ];

  const quickAccessCards = [
    {
      icon: Calendar,
      title: 'Browse Events',
      description: 'Find new events',
      color: 'text-blue-600'
    },
    {
      icon: QrCode,
      title: 'My Tickets',
      description: 'QR codes & passes',
      color: 'text-orange-500'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: '3 new',
      color: 'text-purple-600'
    },
    {
      icon: BookOpen,
      title: 'My Calendar',
      description: 'View schedule',
      color: 'text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EventHub</h1>
                  <p className="text-sm text-gray-600">Access events, register, and manage your calendar.</p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="hidden lg:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Browse Events</span>
                </a>
                <a href="#" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>My Events</span>
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-2">
                  <QrCode className="w-4 h-4" />
                  <span>My Tickets</span>
                </a>
              </nav>
            </div>

            {/* Right Side - Notifications, User Info, Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full">
                    3
                  </Badge>
                </Button>
              </div>

              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center space-x-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>Student</span>
                </Badge>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2">
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
                  <p className="text-sm font-medium text-gray-900">Alex Johnson</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">🎓</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h2>
                  <p className="text-gray-600">You have 2 upcoming events and 3 new notifications.</p>
                </div>
              </div>
              <div className="hidden md:flex space-x-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">5</p>
                  <p className="text-sm text-gray-600">Events Registered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-gray-600">Upcoming</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickAccessCards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <card.icon className={`w-12 h-12 mx-auto mb-3 ${card.color}`} />
                <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Overview
            </TabsTrigger>
            <TabsTrigger value="tickets" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              My Tickets
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              History
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <Badge className="bg-blue-100 text-blue-700">Registered</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <QrCode className="w-4 h-4 mr-2" />
                          Show Ticket
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.event}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">upcoming</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">View All Activity</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tickets">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Tickets content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">History content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Notifications content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Help Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 shadow-lg"
        >
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
