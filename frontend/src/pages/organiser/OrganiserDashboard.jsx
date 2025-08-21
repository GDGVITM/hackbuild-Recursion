import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

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
  X
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';


const OrganiserDashboard = () => {
  const [committees, setCommittees] = useState([
  { _id: "gdg", name: "GDG" },
  { _id: "csi", name: "CSI" }
]);

const CATEGORY_TYPES = [
  "Technology",
  "Business",
  "Education",
  "Health & Wellness",
  "Other"
];

  const [eventData, setEventData] = useState({
    title: "",
    committee: "",
    startTime: "",
    endTime: "",
    location: "",
    maxAttendees: "",
    categories: [],
    description: "",
    tracks: [],
  });

  // Fetch committees from backend
  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const res = await axios.get("/api/committees"); // adjust endpoint
        setCommittees(res.data); // assuming res.data is an array of committees
      } catch (err) {
        console.error("Failed to fetch committees:", err);
      }
    };

    fetchCommittees();
  }, []);

  // createEvent function
  const createEvent = async () => {
  try {
    const formData = new FormData();

    // Basic fields
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("committee", eventData.committee);
    formData.append("startTime", eventData.startTime);
    formData.append("endTime", eventData.endTime);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    formData.append("price", eventData.price || 0);

    // Categories (as JSON string)
    formData.append("categories", JSON.stringify(eventData.categories));

    // Tracks (as JSON string)
    formData.append("tracks", JSON.stringify(eventData.tracks));

    // Integrations (if any)
    formData.append("integrations", JSON.stringify(eventData.integrations || {}));

    // Image file (if uploaded)
    if (eventData.imageFile) {
      formData.append("image", eventData.imageFile);
    }

    // Call backend
    const res = await axios.post("http://localhost:5000/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Event created successfully:", res.data);
    // Close modal or refresh event list here

  } catch (err) {
    console.error("Failed to create event:", err);
  }
};


  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  // Mock data for demonstration
  const stats = [
    { title: 'Total Events', count: 24, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { title: 'Active Events', count: 8, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Total Participants', count: 156, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { title: 'Volunteers', count: 12, icon: UserCheck, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ];

  const events = [
    {
      id: 1,
      name: 'Tech Innovation Summit 2024',
      date: 'March 15, 2024',
      status: 'Active',
      venue: 'Engineering Auditorium',
      participants: 45,
      volunteers: 3
    },
    {
      id: 2,
      name: 'Spring Concert Series',
      date: 'April 18, 2024',
      status: 'Upcoming',
      venue: 'Campus Amphitheater',
      participants: 78,
      volunteers: 5
    },
    {
      id: 3,
      name: 'Science Exhibition',
      date: 'May 10, 2024',
      status: 'Planning',
      venue: 'Science Center',
      participants: 0,
      volunteers: 0
    }
  ];

  const volunteers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@university.edu', role: 'Event Coordinator', events: 3 },
    { id: 2, name: 'Sarah Wilson', email: 'sarah@university.edu', role: 'Registration Helper', events: 2 },
    { id: 3, name: 'Mike Chen', email: 'mike@university.edu', role: 'Technical Support', events: 1 }
  ];

  const notifications = [
    { id: 1, title: 'Event Registration Open', message: 'Tech Summit registration is now open', sent: '2 hours ago', recipients: 156 },
    { id: 2, title: 'Volunteer Meeting', message: 'Reminder: Volunteer briefing tomorrow', sent: '1 day ago', recipients: 12 },
    { id: 3, title: 'Venue Confirmation', message: 'Engineering Auditorium confirmed for Tech Summit', sent: '3 days ago', recipients: 156 }
  ];
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Upcoming': return 'bg-blue-100 text-blue-700';
      case 'Planning': return 'bg-orange-100 text-orange-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
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

              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <Button 
                      onClick={() => setShowCreateEventModal(true)}
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-xs sm:text-sm"
                    >
                      <Plus className="w-4 h-4 sm:w-6 sm:h-6" />
                      <span>Create Event</span>
                    </Button>
                    <Button 
                      onClick={() => setShowEmailModal(true)}
                      variant="outline"
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-xs sm:text-sm"
                    >
                      <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
                      <span>Send Email</span>
                    </Button>
                    <Button 
                      onClick={() => setShowNotificationModal(true)}
                      variant="outline"
                      className="h-16 sm:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-xs sm:text-sm"
                    >
                      <Bell className="w-4 h-4 sm:w-6 sm:h-6" />
                      <span>Send Notification</span>
                    </Button>
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
                        {events.map((event) => (
                          <tr key={event.id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{event.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.date}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getStatusColor(event.status)} text-xs`}>
                                {event.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.venue}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{event.participants}</td>
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

            {/* Volunteers Management */}
            <TabsContent value="volunteers" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Volunteer Management</CardTitle>
                    <Button onClick={() => setShowVolunteerModal(true)} size="sm" className="text-xs sm:text-sm">
                      <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Add Volunteer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
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
                        {volunteers.map((volunteer) => (
                          <tr key={volunteer.id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{volunteer.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{volunteer.email}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className="bg-blue-100 text-blue-700 text-xs">{volunteer.role}</Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{volunteer.events}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs">
                                  <UserMinus className="w-3 h-3 sm:w-4 sm:h-4" />
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

            {/* Communications */}
            <TabsContent value="communications" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Email Communications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setShowEmailModal(true)} className="w-full text-xs sm:text-sm">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Send Email to All Participants
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setShowNotificationModal(true)} className="w-full text-xs sm:text-sm">
                      <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Send Notification
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications History */}
            <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">Notification History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 sm:space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-2 sm:space-y-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{notification.title}</h4>
                          <Badge className="bg-green-100 text-green-700 text-xs w-fit">
                            Sent to {notification.recipients} recipients
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">Sent: {notification.sent}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Event Participation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm sm:text-base">Chart will be displayed here</p>
                        <p className="text-xs sm:text-sm text-gray-400">Using Recharts or Chart.js</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">Volunteer Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <Activity className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm sm:text-base">Chart will be displayed here</p>
                        <p className="text-xs sm:text-sm text-gray-400">Volunteer efficiency metrics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

{/* Create Event Modal */}
{showCreateEventModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl mx-auto overflow-y-auto max-h-[90vh]">
      <h3 className="text-lg font-semibold mb-4">Create New Event</h3>

      <div className="space-y-3 sm:space-y-4">
        {/* Event Title */}
        <Input
          placeholder="Event Title"
          value={eventData.title}
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          className="text-sm"
        />

        {/* Committee */}
        <select
          value={eventData.committee}
          onChange={(e) => setEventData({ ...eventData, committee: e.target.value })}
          className="text-sm w-full border rounded p-2"
        >
          <option value="">Select Committee</option>
          <option value="GDG">GDG</option>
          <option value="CSI">CSI</option>
        </select>

        {/* Start & End Date */}
        <div className="flex gap-2">
          <Input
            placeholder="Start Time"
            type="datetime-local"
            value={eventData.startTime}
            onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
            className="text-sm flex-1"
          />
          <Input
            placeholder="End Time"
            type="datetime-local"
            value={eventData.endTime}
            onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
            className="text-sm flex-1"
          />
        </div>

        {/* Location */}
        <Input
          placeholder="Location"
          value={eventData.location}
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
          className="text-sm"
        />

        {/* Max Attendees */}
        <Input
          placeholder="Max Attendees"
          type="number"
          value={eventData.maxAttendees}
          onChange={(e) => setEventData({ ...eventData, maxAttendees: e.target.value })}
          className="text-sm"
        />

        {/* Categories (Checkboxes for predefined options) */}
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold text-sm w-full">Categories:</span>
          {CATEGORY_TYPES.map((cat) => (
            <label key={cat} className="flex items-center gap-1 text-sm border rounded p-1 cursor-pointer">
              <input
                type="checkbox"
                checked={eventData.categories.includes(cat)}
                onChange={(e) => {
                  let newCategories = [...eventData.categories];
                  if (e.target.checked) newCategories.push(cat);
                  else newCategories = newCategories.filter((c) => c !== cat);
                  setEventData({ ...eventData, categories: newCategories });
                }}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Price */}
        <Input
          placeholder="Event Price (0 = Free)"
          type="number"
          value={eventData.price}
          onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
          className="text-sm"
        />

        {/* Image */}
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setEventData({ ...eventData, imageFile: e.target.files[0] })}
          className="text-sm"
        />

        {/* Description */}
        <Textarea
          placeholder="Event Description"
          value={eventData.description}
          onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          className="text-sm"
        />

        {/* Tracks */}
        <div className="space-y-2">
          <h4 className="font-semibold">Tracks</h4>
          {eventData.tracks.map((track, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 border rounded p-2">
              <Input
                placeholder="Track Name"
                value={track.name}
                onChange={(e) => {
                  const newTracks = [...eventData.tracks];
                  newTracks[idx].name = e.target.value;
                  setEventData({ ...eventData, tracks: newTracks });
                }}
                className="text-sm flex-1"
              />
              <Input
                placeholder="Track Start Time"
                type="datetime-local"
                value={track.startTime}
                onChange={(e) => {
                  const newTracks = [...eventData.tracks];
                  newTracks[idx].startTime = e.target.value;
                  setEventData({ ...eventData, tracks: newTracks });
                }}
                className="text-sm flex-1"
              />
              <Input
                placeholder="Track End Time"
                type="datetime-local"
                value={track.endTime}
                onChange={(e) => {
                  const newTracks = [...eventData.tracks];
                  newTracks[idx].endTime = e.target.value;
                  setEventData({ ...eventData, tracks: newTracks });
                }}
                className="text-sm flex-1"
              />
              <Button
                variant="outline"
                onClick={() => {
                  const newTracks = eventData.tracks.filter((_, i) => i !== idx);
                  setEventData({ ...eventData, tracks: newTracks });
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              setEventData({
                ...eventData,
                tracks: [...eventData.tracks, { name: "", startTime: "", endTime: "", location: "", maxAttendees: "" }]
              })
            }
          >
            Add Track
          </Button>
        </div>

        {/* Integrations */}
        <Input
          placeholder="Google Calendar ID"
          value={eventData.integrations?.googleCalendarId || ""}
          onChange={(e) => setEventData({ ...eventData, integrations: { ...eventData.integrations, googleCalendarId: e.target.value } })}
          className="text-sm"
        />
        {eventData.integrations?.externalApis?.map((api, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder="API Name"
              value={api.name}
              onChange={(e) => {
                const newApis = [...eventData.integrations.externalApis];
                newApis[idx].name = e.target.value;
                setEventData({ ...eventData, integrations: { ...eventData.integrations, externalApis: newApis } });
              }}
              className="text-sm flex-1"
            />
            <Input
              placeholder="Endpoint"
              value={api.endpoint}
              onChange={(e) => {
                const newApis = [...eventData.integrations.externalApis];
                newApis[idx].endpoint = e.target.value;
                setEventData({ ...eventData, integrations: { ...eventData.integrations, externalApis: newApis } });
              }}
              className="text-sm flex-1"
            />
            <Button
              variant="outline"
              onClick={() => {
                const newApis = eventData.integrations.externalApis.filter((_, i) => i !== idx);
                setEventData({ ...eventData, integrations: { ...eventData.integrations, externalApis: newApis } });
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            const apis = eventData.integrations?.externalApis || [];
            setEventData({ ...eventData, integrations: { ...eventData.integrations, externalApis: [...apis, { name: "", endpoint: "" }] } });
          }}
        >
          Add API
        </Button>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
        <Button
          variant="outline"
          onClick={() => setShowCreateEventModal(false)}
          className="text-xs sm:text-sm"
        >
          Cancel
        </Button>
        <Button
          className="text-xs sm:text-sm"
          onClick={createEvent}
        >
          Create Event
        </Button>
      </div>
    </div>
  </div>
)}



      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Send Email to Participants</h3>
            <div className="space-y-3 sm:space-y-4">
              <Input placeholder="Subject" className="text-sm" />
              <Textarea placeholder="Message" rows={6} className="text-sm" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
              <Button variant="outline" onClick={() => setShowEmailModal(false)} className="text-xs sm:text-sm">
                Cancel
              </Button>
              <Button className="text-xs sm:text-sm">
                <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Send Push Notification</h3>
            <div className="space-y-3 sm:space-y-4">
              <Input placeholder="Title" className="text-sm" />
              <Textarea placeholder="Message" rows={4} className="text-sm" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
              <Button variant="outline" onClick={() => setShowNotificationModal(false)} className="text-xs sm:text-sm">
                Cancel
              </Button>
              <Button className="text-xs sm:text-sm">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Volunteer Modal */}
      {showVolunteerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Volunteer</h3>
            <div className="space-y-3 sm:space-y-4">
              <Input placeholder="Full Name" className="text-sm" />
              <Input placeholder="Email" type="email" className="text-sm" />
              <Input placeholder="Role" className="text-sm" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-6">
              <Button variant="outline" onClick={() => setShowVolunteerModal(false)} className="text-xs sm:text-sm">
                Cancel
              </Button>
              <Button className="text-xs sm:text-sm">
                <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Add Volunteer
              </Button>
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
