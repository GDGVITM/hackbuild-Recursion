import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Mail,
  Edit,
  Trash2,
  Send,
  MessageSquare,
  UserCheck,
  UserX,
  PieChart,
  Activity,
  Menu,
  X,
  DollarSign,
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';

const OrganiserDashboard = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  // Mock data for the new dashboard
  const myEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2024',
      category: 'Technology',
      date: '2024-02-15',
      time: '09:00 AM',
      venue: 'Main Auditorium',
      status: 'Registration Open',
      registrations: 150,
      maxCapacity: 200,
      revenue: 15000,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      title: 'Cultural Fest 2024',
      category: 'Cultural',
      date: '2024-02-20',
      time: '06:00 PM',
      venue: 'Open Air Theater',
      status: 'Full',
      registrations: 300,
      maxCapacity: 300,
      revenue: 25000,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 3,
      title: 'Career Fair 2024',
      category: 'Career',
      date: '2024-02-25',
      time: '10:00 AM',
      venue: 'Conference Hall',
      status: 'Draft',
      registrations: 0,
      maxCapacity: 150,
      revenue: 0,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  const stats = [
    {
      title: 'Total Events',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: 'Total Registrations',
      value: '1,234',
      change: '+156',
      changeType: 'positive',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Total Revenue',
      value: '₹45,000',
      change: '+₹8,500',
      changeType: 'positive',
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Avg. Attendance',
      value: '85%',
      change: '+5%',
      changeType: 'positive',
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const quickActions = [
    {
      title: 'Create Event',
      description: 'Start a new event',
      icon: <Plus className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      href: '/dashboard/organizer/events/create'
    },
    {
      title: 'View Analytics',
      description: 'Check event performance',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      href: '/dashboard/organizer/analytics'
    },
    {
      title: 'Manage Events',
      description: 'Edit existing events',
      icon: <Calendar className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      href: '/dashboard/organizer/events'
    },
    {
      title: 'Reports',
      description: 'Generate reports',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      href: '/dashboard/organizer/reports'
    }
  ];

  const notifications = [
    { id: 1, title: 'Event Registration Open', message: 'Tech Summit registration is now open', sent: '2 hours ago', recipients: 156 },
    { id: 2, title: 'Volunteer Meeting', message: 'Reminder: Volunteer briefing tomorrow', sent: '1 day ago', recipients: 12 },
    { id: 3, title: 'Venue Confirmation', message: 'Engineering Auditorium confirmed for Tech Summit', sent: '3 days ago', recipients: 156 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registration Open':
        return 'bg-green-100 text-green-800';
      case 'Full':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'} hidden lg:block`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">EventHub</h1>
                <p className="text-sm text-gray-600">Organiser Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {[
            { icon: BarChart3, label: 'Dashboard', value: 'overview' },
            { icon: Calendar, label: 'Events', value: 'events' },
            { icon: Users, label: 'Volunteers', value: 'volunteers' },
            { icon: Mail, label: 'Communications', value: 'communications' },
            { icon: Bell, label: 'Notifications', value: 'notifications' },
            { icon: TrendingUp, label: 'Analytics', value: 'analytics' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.value
                  ? 'bg-orange-100 text-orange-700'
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
                <Badge className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center space-x-1">
                  <GraduationCap className="w-3 h-3" />
                  <span>Organiser</span>
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
                  {user?.firstName || user?.fullName || 'Organiser'}
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
                { icon: Users, label: 'Volunteers', value: 'volunteers' },
                { icon: Mail, label: 'Communications', value: 'communications' },
                { icon: Bell, label: 'Notifications', value: 'notifications' },
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
                      ? 'bg-orange-100 text-orange-700'
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
            {/* Dashboard Overview - NEW DESIGN */}
            <TabsContent value="overview" className="space-y-8">
              {/* Welcome Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'Organiser'}! 🎯</h1>
                    <p className="text-purple-100 text-lg">
                      You have {myEvents.filter(e => e.status === 'Registration Open').length} active events
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-10 h-10" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-green-600">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      to={action.href}
                      className="group p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* My Events */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Events</h2>
                  <Link 
                    to="/dashboard/organizer/events"
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myEvents.map((event) => (
                    <div key={event.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <button className="p-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors duration-200">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.date} • {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.registrations}/{event.maxCapacity} registered</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-4">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {Math.round((event.registrations / event.maxCapacity) * 100)}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <p className="text-gray-600">Revenue</p>
                            <p className="font-semibold text-gray-900">₹{event.revenue.toLocaleString()}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Link 
                              to={`/dashboard/organizer/events/${event.id}`}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link 
                              to={`/dashboard/organizer/events/${event.id}/edit`}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">New registration for Tech Innovation Summit</p>
                      <p className="text-sm text-gray-600">John Doe registered 2 minutes ago</p>
                    </div>
                    <span className="text-sm text-gray-500">2m ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Event published: Cultural Fest 2024</p>
                      <p className="text-sm text-gray-600">Event is now live for registrations</p>
                    </div>
                    <span className="text-sm text-gray-500">1h ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Payment received for Tech Innovation Summit</p>
                      <p className="text-sm text-gray-600">₹500 received from Jane Smith</p>
                    </div>
                    <span className="text-sm text-gray-500">3h ago</span>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Events Management */}
            <TabsContent value="events" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Events Management</CardTitle>
                    <Button onClick={() => setShowCreateEventModal(true)} size="sm" className="text-xs sm:text-sm">
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Create Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Event Name</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Date</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Status</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Venue</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Participants</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myEvents.map((event) => (
                          <tr key={event.id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{event.title}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.date}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getStatusColor(event.status)} text-xs`}>
                                {event.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.venue}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.registrations}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs">
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
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

            {/* Other tabs remain the same */}
            <TabsContent value="volunteers" className="space-y-4 sm:space-y-6">
              {/* Volunteer content */}
            </TabsContent>

            <TabsContent value="communications" className="space-y-4 sm:space-y-6">
              {/* Communications content */}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
              {/* Notifications content */}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              {/* Analytics content */}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Modals */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
            <div className="space-y-3 sm:space-y-4">
              <Input placeholder="Event Name" className="text-sm" />
              <Input placeholder="Date" type="date" className="text-sm" />
              <Input placeholder="Venue" className="text-sm" />
              <Textarea placeholder="Event Description" className="text-sm" />
              <Input placeholder="Capacity" type="number" className="text-sm" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
              <Button variant="outline" onClick={() => setShowCreateEventModal(false)} className="text-xs sm:text-sm">
                Cancel
              </Button>
              <Button className="text-xs sm:text-sm">Create Event</Button>
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <Button
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-600 hover:bg-orange-700 shadow-lg"
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default OrganiserDashboard;