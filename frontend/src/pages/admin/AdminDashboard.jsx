import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
  HelpCircle,
  Users,
  Building2,
  FileText,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data for demonstration
  const stats = [
    { title: 'Total Events', count: 156, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Approved Events', count: 142, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Pending Requests', count: 14, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Total Users', count: 2, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  const events = [
    {
      id: 1,
      name: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      organiser: 'Engineering Department',
      status: 'Pending',
      venue: 'Engineering Auditorium',
      capacity: 200
    },
    {
      id: 2,
      name: 'Spring Concert Series',
      date: 'April 18, 2024',
      organiser: 'Music Club',
      status: 'Approved',
      venue: 'Campus Amphitheater',
      capacity: 500
    },
    {
      id: 3,
      name: 'Science Exhibition',
      date: 'May 10, 2024',
      organiser: 'Science Society',
      status: 'Rejected',
      venue: 'Science Center',
      capacity: 150
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      eventName: 'Cultural Festival',
      organiser: 'Cultural Club',
      date: 'June 20, 2024',
      venue: 'Main Hall',
      capacity: 300
    },
    {
      id: 2,
      eventName: 'Career Fair',
      organiser: 'Career Services',
      date: 'July 5, 2024',
      venue: 'Conference Center',
      capacity: 400
    }
  ];

  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@university.edu', role: 'Student', events: 5 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@university.edu', role: 'Organiser', events: 12 },
    { id: 3, name: 'Mike Chen', email: 'mike@university.edu', role: 'Student', events: 3 }
  ];

  const venues = [
    { id: 1, name: 'Engineering Auditorium', capacity: 200, status: 'Available', type: 'Auditorium' },
    { id: 2, name: 'Campus Amphitheater', capacity: 500, status: 'Booked', type: 'Outdoor' },
    { id: 3, name: 'Science Center', capacity: 150, status: 'Available', type: 'Lab' },
    { id: 4, name: 'Main Hall', capacity: 300, status: 'Available', type: 'Hall' }
  ];

  const logs = [
    { timestamp: '2024-02-20 10:30', actor: 'Sarah Wilson', action: 'Created Event', target: 'Tech Summit' },
    { timestamp: '2024-02-20 09:15', actor: 'Admin', action: 'Approved Event', target: 'Spring Concert' },
    { timestamp: '2024-02-19 16:45', actor: 'Mike Chen', action: 'Registered for Event', target: 'Career Fair' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVenueStatusColor = (status) => {
    return status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} hidden lg:block`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">EventHub</h1>
                <p className="text-sm text-gray-600">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { icon: BarChart3, label: 'Dashboard', value: 'overview' },
            { icon: Calendar, label: 'Events', value: 'events' },
            { icon: Clock, label: 'Approvals', value: 'approvals' },
            { icon: Users, label: 'Users', value: 'users' },
            { icon: Building2, label: 'Venues', value: 'venues' },
            { icon: FileText, label: 'Logs', value: 'logs' },
            { icon: TrendingUp, label: 'Analytics', value: 'analytics' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              {/* Desktop Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">
                {activeTab === 'overview' ? 'Dashboard' : activeTab}
              </h2>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <span className="text-sm text-gray-600">Logged in as:</span>
                <Badge className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center space-x-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>Admin</span>
                </Badge>
              </div>
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
                  {user?.firstName || user?.fullName || 'Admin'}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
              {[
                { icon: BarChart3, label: 'Dashboard', value: 'overview' },
                { icon: Calendar, label: 'Events', value: 'events' },
                { icon: Clock, label: 'Approvals', value: 'approvals' },
                { icon: Users, label: 'Users', value: 'users' },
                { icon: Building2, label: 'Venues', value: 'venues' },
                { icon: FileText, label: 'Logs', value: 'logs' },
                { icon: TrendingUp, label: 'Analytics', value: 'analytics' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setActiveTab(item.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeTab === item.value
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            {/* Dashboard Overview */}
            <TabsContent value="overview" className="space-y-4 sm:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.count}</p>
                        </div>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                          <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {logs.slice(0, 5).map((log, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border border-gray-200 rounded-lg space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{log.actor} {log.action}</p>
                            <p className="text-xs sm:text-sm text-gray-600">{log.target}</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Management */}
            <TabsContent value="events" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Events Management</CardTitle>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Input placeholder="Search events..." className="w-full sm:w-64 text-sm" />
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Event Name</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Date</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Organiser</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Status</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Venue</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr key={event.id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{event.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.date}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.organiser}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getStatusColor(event.status)} text-xs`}>
                                {event.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.venue}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                {event.status === 'Pending' && (
                                  <>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>
                                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approvals */}
            <TabsContent value="approvals" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                          <div className="space-y-1 sm:space-y-2">
                            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{request.eventName}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">Organiser: {request.organiser}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Date: {request.date}</p>
                            <p className="text-xs sm:text-sm text-gray-600">Venue: {request.venue} (Capacity: {request.capacity})</p>
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Approve
                            </Button>
                            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 text-xs sm:text-sm">
                              <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Users & Organisers</CardTitle>
                    <Button size="sm" className="text-xs sm:text-sm">
                      <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Add Organiser
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
                      <TabsTrigger value="organisers" className="text-xs sm:text-sm">Organisers</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="users" className="space-y-3 sm:space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Name</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Email</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Role</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Events</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.id} className="border-b border-gray-100">
                                <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{user.name}</td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                                <td className="py-3 px-2 sm:px-4">
                                  <Badge className="bg-blue-100 text-blue-700 text-xs">{user.role}</Badge>
                                </td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.events}</td>
                                <td className="py-3 px-2 sm:px-4">
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs">
                                    <UserMinus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="organisers" className="space-y-3 sm:space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Name</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Email</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Events Created</th>
                              <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.filter(u => u.role === 'Organiser').map((user) => (
                              <tr key={user.id} className="border-b border-gray-100">
                                <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{user.name}</td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.events}</td>
                                <td className="py-3 px-2 sm:px-4">
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs">
                                    <UserMinus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Venues */}
            <TabsContent value="venues" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Venue Management</CardTitle>
                    <Button size="sm" className="text-xs sm:text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Add Venue
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Venue Name</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Type</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Capacity</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Status</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {venues.map((venue) => (
                          <tr key={venue.id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{venue.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{venue.type}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{venue.capacity}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getVenueStatusColor(venue.status)} text-xs`}>
                                {venue.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Button size="sm" variant="outline" className="text-xs">
                                Allot Venue
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logs */}
            <TabsContent value="logs" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Activity Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Timestamp</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actor</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Action</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Target</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map((log, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{log.timestamp}</td>
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{log.actor}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{log.action}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{log.target}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">Load More</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Events by Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm sm:text-base">Chart will be displayed here</p>
                        <p className="text-xs sm:text-sm text-gray-400">Using Recharts or Chart.js</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm sm:text-base">Chart will be displayed here</p>
                        <p className="text-xs sm:text-sm text-gray-400">Using Recharts or Chart.js</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Monthly Events Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm sm:text-base">Bar chart will be displayed here</p>
                      <p className="text-xs sm:text-sm text-gray-400">Events count by month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Help Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <Button
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 hover:bg-gray-900 shadow-lg"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
