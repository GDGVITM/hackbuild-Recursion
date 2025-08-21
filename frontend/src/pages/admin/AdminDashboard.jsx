import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  ChevronLeft,
  GraduationCap,
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
  Filter,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Menu,
  X
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';

const AdminDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State to track the currently selected event for management
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock data for demonstration
  const stats = [
    { title: 'Total Events', count: 156, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Approved Events', count: 142, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Pending Requests', count: 14, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Total Users', count: '8.5K', icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  const events = [
    { id: 1, name: 'Tech Innovation Summit 2024', date: 'March 15, 2024', organiser: 'Engineering Department', status: 'Pending', venue: 'Engineering Auditorium', capacity: 200 },
    { id: 2, name: 'Spring Concert Series', date: 'April 18, 2024', organiser: 'Music Club', status: 'Approved', venue: 'Campus Amphitheater', capacity: 500 },
    { id: 3, name: 'Science Exhibition', date: 'May 10, 2024', organiser: 'Science Society', status: 'Rejected', venue: 'Science Center', capacity: 150 }
  ];

  const pendingRequests = [
    { id: 1, eventName: 'Cultural Festival', organiser: 'Cultural Club', date: 'June 20, 2024', venue: 'Main Hall', capacity: 300 },
    { id: 2, eventName: 'Career Fair', organiser: 'Career Services', date: 'July 5, 2024', venue: 'Conference Center', capacity: 400 }
  ];

  // Updated mock data with eventId for context
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@university.edu', role: 'Student', registeredEventIds: [1, 2] },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@university.edu', role: 'Organiser', organisedEventIds: [2] },
    { id: 3, name: 'Mike Chen', email: 'mike@university.edu', role: 'Student', registeredEventIds: [2, 3] },
    { id: 4, name: 'Laura Brown', email: 'laura@university.edu', role: 'Student', registeredEventIds: [1] }
  ];

  const volunteers = [
    { id: 1, name: 'Emily White', email: 'emily.w@university.edu', eventId: 1, status: 'Approved' },
    { id: 2, name: 'David Lee', email: 'david.l@university.edu', eventId: 2, status: 'Approved' },
    { id: 3, name: 'Jessica Green', email: 'jessica.g@university.edu', eventId: 2, status: 'Pending' }
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

  // Navigation items, "Users" is removed
  const navItems = [
    { icon: BarChart3, label: 'Dashboard', value: 'overview' },
    { icon: Calendar, label: 'Events', value: 'events' },
    { icon: Clock, label: 'Approvals', value: 'approvals' },
    { icon: Building2, label: 'Venues', value: 'venues' },
    { icon: FileText, label: 'Logs', value: 'logs' },
    { icon: TrendingUp, label: 'Analytics', value: 'analytics' }
  ];

  const handleNavClick = (tabValue) => {
    setActiveTab(tabValue);
    setSelectedEvent(null); // Reset selected event when changing main tabs
    setMobileMenuOpen(false);
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
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.value
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
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:block">
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
              <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 sm:w-10 sm:h-10" } }} />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user?.firstName || 'Admin'}</p>
              </div>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-gray-200 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${activeTab === item.value ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
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
          <Tabs value={activeTab} onValueChange={handleNavClick} className="space-y-4 sm:space-y-6">

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
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{log.actor} {log.action}</p>
                            <p className="text-xs text-gray-600">{log.target}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ======================= REFACTORED EVENTS TAB ======================= */}
            <TabsContent value="events" className="space-y-4 sm:space-y-6">
              {!selectedEvent ? (
                // VIEW 1: Events List
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                      <CardTitle className="text-lg sm:text-xl">Events Management</CardTitle>
                      <div className="flex space-x-2">
                        <Input placeholder="Search events..." className="w-full sm:w-64 text-sm" />
                        <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" />Filter</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Event Name</th>
                            <th className="text-left py-3 px-4 font-medium">Date</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event) => (
                            <tr key={event.id} className="border-b border-gray-100">
                              <td className="py-3 px-4 font-medium">{event.name}</td>
                              <td className="py-3 px-4 text-gray-600">{event.date}</td>
                              <td className="py-3 px-4"><Badge className={getStatusColor(event.status)}>{event.status}</Badge></td>
                              <td className="py-3 px-4">
                                <Button size="sm" onClick={() => setSelectedEvent(event)}>
                                  Manage
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // VIEW 2: Single Event Management
                <Card>
                  <CardHeader className="pb-3 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)} className="mb-2">
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Back to Events List
                        </Button>
                        <CardTitle className="text-lg sm:text-xl">Managing: {selectedEvent.name}</CardTitle>
                      </div>
                      <Button size="sm"><UserPlus className="w-4 h-4 mr-2" />Assign User</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Tabs defaultValue="users" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="users">Registered Users</TabsTrigger>
                        <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
                        <TabsTrigger value="organisers">Organisers</TabsTrigger>
                      </TabsList>

                      <TabsContent value="users" className="mt-4">
                        <table className="w-full">
                          <thead><tr className="border-b"><th className="text-left p-2 font-medium">Name</th><th className="text-left p-2 font-medium">Email</th><th className="text-left p-2 font-medium">Actions</th></tr></thead>
                          <tbody>
                            {/* FIX APPLIED HERE */}
                            {users.filter(u => u.registeredEventIds && u.registeredEventIds.includes(selectedEvent.id)).map(user => (
                              <tr key={user.id} className="border-b border-gray-100"><td className="p-2">{user.name}</td><td className="p-2">{user.email}</td><td className="p-2"><Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><UserMinus className="w-4 h-4 mr-2" />Remove</Button></td></tr>
                            ))}
                          </tbody>
                        </table>
                      </TabsContent>
                      <TabsContent value="volunteers" className="mt-4">
                        <table className="w-full">
                          <thead><tr className="border-b"><th className="text-left p-2 font-medium">Name</th><th className="text-left p-2 font-medium">Email</th><th className="text-left p-2 font-medium">Status</th><th className="text-left p-2 font-medium">Actions</th></tr></thead>
                          <tbody>
                            {volunteers.filter(v => v.eventId === selectedEvent.id).map(v => (
                              <tr key={v.id} className="border-b border-gray-100"><td className="p-2">{v.name}</td><td className="p-2">{v.email}</td><td className="p-2"><Badge className={getStatusColor(v.status)}>{v.status}</Badge></td><td className="p-2"><Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-2" />View</Button></td></tr>
                            ))}
                          </tbody>
                        </table>
                      </TabsContent>
                      <TabsContent value="organisers" className="mt-4">
                        <table className="w-full">
                          <thead><tr className="border-b"><th className="text-left p-2 font-medium">Name</th><th className="text-left p-2 font-medium">Email</th><th className="text-left p-2 font-medium">Actions</th></tr></thead>
                          <tbody>
                            {/* FIX APPLIED HERE */}
                            {users.filter(u => u.role === 'Organiser' && u.organisedEventIds && u.organisedEventIds.includes(selectedEvent.id)).map(user => (
                              <tr key={user.id} className="border-b border-gray-100"><td className="p-2">{user.name}</td><td className="p-2">{user.email}</td><td className="p-2"><Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><UserMinus className="w-4 h-4 mr-2" />Remove</Button></td></tr>
                            ))}
                          </tbody>
                        </table>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            {/* Other TabsContent sections remain here... */}
            <TabsContent value="approvals">{/* Approvals content */}</TabsContent>
            <TabsContent value="venues">{/* Venues content */}</TabsContent>
            <TabsContent value="logs">{/* Logs content */}</TabsContent>
            <TabsContent value="analytics">{/* Analytics content */}</TabsContent>
          </Tabs>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <Button size="icon" className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-900 shadow-lg">
          <HelpCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;