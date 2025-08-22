import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import VenueForm from '@/components/venues/VenueForm';
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
  X,
  Loader2
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard = () => {
  const { user: clerkUser } = useUser();
  const { user: authUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for real data
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [showVenueForm, setShowVenueForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [usersLoading, setUsersLoading] = useState(false);
  
  // Get the actual user data
  const user = authUser || clerkUser;
  const userName = user?.name || user?.firstName || user?.fullName || 'Admin';

  // Fetch user statistics
  const fetchUserStats = async () => {
    try {
      console.log('Fetching user stats...');
      const response = await fetch('http://localhost:5000/api/users/stats');
      
      if (response.ok) {
        const data = await response.json();
        console.log('User stats response:', data);
        
        if (data.success && data.stats) {
           // Update the Total Users count in stats
           setStats(prevStats => 
             prevStats.map(stat => 
               stat.title === 'Total Users' 
                 ? { ...stat, count: data.stats.totalUsers }
                 : stat
             )
           );
           console.log('Updated stats with user count:', data.stats.totalUsers);
        } else {
          console.error('Invalid stats response format:', data);
        }
      } else {
        console.error('Failed to fetch user stats:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      // For now, use mock data to avoid 403 errors
      // TODO: Re-enable when admin authentication is working
      const mockStats = [
        { title: 'Total Events', count: events.length, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
        { title: 'Approved Events', count: events.filter(e => e.status === 'Approved').length, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
        { title: 'Pending Requests', count: events.filter(e => e.status === 'Pending').length, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
        { title: 'Total Users', count: users.length, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
      ];
      setStats(mockStats);
      
      // TODO: Re-enable this when admin auth is working
      /*
      const response = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const statsData = [
          { title: 'Total Events', count: data.stats.totalEvents, icon: Calendar, color: 'text-blue-600', bgColor: 'bg-blue-50' },
          { title: 'Approved Events', count: data.stats.approvedEvents, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' },
          { title: 'Pending Requests', count: data.stats.pendingEvents, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
          { title: 'Total Users', count: data.stats.totalUsers, icon: Users, color: 'text-purple-600', bgColor: 'bg-purple-50' }
        ];
        setStats(statsData);
      }
      */
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  // Fetch events
  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);
      
      // Use the regular events endpoint like LandingPage
      const response = await fetch(`http://localhost:5000/api/events?${params}`);
      if (response.ok) {
        const data = await response.json();
        // Events are returned directly as an array
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch pending approvals
  const fetchPendingApprovals = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/events/pending-approvals', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data.pendingEvents);
      }
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      console.log('Fetching users from /api/users...');
      const response = await fetch('http://localhost:5000/api/users');
      
      if (response.ok) {
        const data = await response.json();
        console.log('Users API response:', data);
        
        if (data.success && data.users) {
          setUsers(data.users);
          console.log('Users fetched successfully:', data.users.length);
        } else {
          console.error('Invalid response format:', data);
          setUsers([]);
        }
      } else {
        console.error('Failed to fetch users:', response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error details:', errorData);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  // Fetch venues
  const fetchVenues = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/venues');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setVenues(Object.values(data.venues).flat());
        }
      }
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  };

  // Handle venue form submission
  const handleVenueSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setShowVenueForm(false);
          fetchVenues();
        }
      }
    } catch (error) {
      console.error('Error creating venue:', error);
    }
  };

  // Handle venue edit
  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowVenueForm(true);
  };

  // Handle venue deletion
  const handleDeleteVenue = async (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/venues/${venueId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            fetchVenues();
          }
        }
      } catch (error) {
        console.error('Error deleting venue:', error);
      }
    }
  };

  // Fetch recent activity
  const fetchRecentActivity = async () => {
    try {
      // For now, use mock data to avoid 403 errors
      // TODO: Re-enable when admin authentication is working
      const mockLogs = [
        {
          user: { name: 'System' },
          action: 'Dashboard loaded',
          target: 'Admin Panel',
          timestamp: new Date()
        }
      ];
      setLogs(mockLogs);
      
      // TODO: Re-enable this when admin auth is working
      /*
      const response = await fetch('http://localhost:5000/api/admin/dashboard/recent-activity', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLogs(data.recentActivity);
      }
      */
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  // Handle event approval/rejection
  const handleEventStatusUpdate = async (eventId, status, rejectionReason = '') => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/events/${eventId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status, rejectionReason })
      });
      
      if (response.ok) {
        // Refresh the data
        fetchPendingApprovals();
        fetchEvents();
        fetchDashboardStats();
        fetchRecentActivity();
      }
    } catch (error) {
      console.error('Error updating event status:', error);
    }
  };



  // Handle making user an organizer
  const handleMakeOrganizer = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to make ${userName} an organizer?`)) {
      try {
        console.log('Updating user role to organizer:', userId);
        const response = await fetch(`http://localhost:5000/api/users/${userId}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role: 'organizer' })
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Role update response:', data);
          
          if (data.success) {
            // Update local state
            setUsers(users.map(user => 
              user._id === userId ? { ...user, role: 'organizer' } : user
            ));
            alert(`${userName} is now an organizer!`);
            
            // Refresh user stats
            fetchUserStats();
          } else {
            alert(`Error: ${data.error}`);
          }
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Failed to update user role');
      }
    }
  };

  // Handle removing user
  const handleRemoveUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to remove ${userName}?`)) {
      try {
        console.log('Deactivating user:', userId);
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('User deactivation response:', data);
          
          if (data.success) {
            // Remove from local state
            setUsers(users.filter(user => user._id !== userId));
            alert('User removed successfully!');
            
            // Refresh user stats
            fetchUserStats();
          } else {
            alert(`Error: ${data.error}`);
          }
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error removing user:', error);
        alert('Failed to remove user');
      }
    }
  };

  // Load data when component mounts or tab changes
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchDashboardStats(),
        fetchRecentActivity(),
        fetchUserStats(),
        fetchUsers()
      ]);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (activeTab === 'events') {
      fetchEvents();
    } else if (activeTab === 'approvals') {
      fetchPendingApprovals();
    } else if (activeTab === 'users') {
      console.log('Fetching users...');
      fetchUsers();
    } else if (activeTab === 'venues') {
      fetchVenues();
    } else if (activeTab === 'logs') {
      fetchRecentActivity();
    }
  }, [activeTab, searchTerm, statusFilter]);

  // Update stats when events change
  useEffect(() => {
    if (events.length > 0) {
      fetchDashboardStats();
    }
  }, [events]);

  // Update stats when users change
  useEffect(() => {
    console.log('Users changed:', users.length, users);
    if (users.length > 0) {
      fetchDashboardStats();
    }
  }, [users]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVenueStatusColor = (status) => {
    return status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

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
                  {userName}
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
                            <p className="font-medium text-gray-900 text-sm sm:text-base">
                              {log.user?.name || 'System'} {log.action}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">{log.target}</p>
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {formatDate(log.timestamp)}
                        </span>
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
                      <Input 
                        placeholder="Search events..." 
                        className="w-full sm:w-64 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
                          <tr key={event._id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{event.title}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              {formatDate(event.startTime)}
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              {event.organizer?.name || 'N/A'}
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getStatusColor(event.status)} text-xs`}>
                                {event.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              {event.venue?.name || event.location || 'N/A'}
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                                {event.status === 'Pending' && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-green-600 hover:bg-green-700 text-xs"
                                      onClick={() => handleEventStatusUpdate(event._id, 'Approved')}
                                    >
                                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      className="bg-red-600 hover:bg-red-700 text-xs"
                                      onClick={() => handleEventStatusUpdate(event._id, 'Rejected')}
                                    >
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
                    {pendingRequests.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No pending approvals</p>
                    ) : (
                      pendingRequests.map((request) => (
                        <div key={request._id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 space-y-3 sm:space-y-0">
                            <div className="space-y-1 sm:space-y-2">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{request.title}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Organiser: {request.organizer?.name || 'N/A'}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Date: {formatDate(request.startTime)}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600">
                                Venue: {request.venue?.name || request.location || 'N/A'} 
                                {request.maxAttendees && ` (Capacity: ${request.maxAttendees})`}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                                onClick={() => handleEventStatusUpdate(request._id, 'Approved')}
                              >
                                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                className="border-red-200 text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                                onClick={() => handleEventStatusUpdate(request._id, 'Rejected')}
                              >
                                <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={fetchUsers}
                      disabled={usersLoading}
                      className="text-xs sm:text-sm"
                    >
                      {usersLoading ? (
                        <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                      ) : (
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      )}
                      Refresh Users
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
                      {usersLoading ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                          <p className="text-gray-600">Loading users...</p>
                        </div>
                      ) : users.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No users found</p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={fetchUsers}
                            className="mt-2"
                          >
                            Retry
                          </Button>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Name</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Email</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Role</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Joined</th>
                                <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-100">
                                  <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{user.name}</td>
                                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                                  <td className="py-3 px-2 sm:px-4">
                                    <Badge className="bg-blue-100 text-blue-700 text-xs capitalize">{user.role}</Badge>
                                  </td>
                                  <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                                    {formatDate(user.createdAt)}
                                  </td>
                                  <td className="py-3 px-2 sm:px-4">
                                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                                      {user.role !== 'organizer' && (
                                        <Button 
                                          size="sm" 
                                          variant="outline" 
                                          className="text-blue-600 border-blue-200 hover:bg-blue-50 text-xs"
                                          onClick={() => handleMakeOrganizer(user._id, user.name)}
                                        >
                                          <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                          Make Organiser
                                        </Button>
                                      )}
                                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs" onClick={() => handleRemoveUser(user._id, user.name)}>
                                        <UserMinus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                        Remove
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
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
                            {users.filter(u => u.role === 'organizer').map((user) => (
                              <tr key={user._id} className="border-b border-gray-100">
                                <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{user.name}</td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{user.email}</td>
                                <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                                  {/* This would need a separate API call to count user's events */}
                                  N/A
                                </td>
                                <td className="py-3 px-2 sm:px-4">
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 text-xs" onClick={() => handleRemoveUser(user._id, user.name)}>
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
              {showVenueForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <VenueForm
                    onSubmit={handleVenueSubmit}
                    onCancel={() => {
                      setShowVenueForm(false);
                      setSelectedVenue(null);
                    }}
                    initialData={selectedVenue}
                  />
                </div>
              )}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <CardTitle className="text-lg sm:text-xl">Venue Management</CardTitle>
                    <Button 
                      size="sm" 
                      className="text-xs sm:text-sm"
                      onClick={() => {
                        setSelectedVenue(null);
                        setShowVenueForm(true);
                      }}
                    >
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
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Current Booking</th>
                          <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {venues.map((venue) => (
                          <tr key={venue._id} className="border-b border-gray-100">
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">{venue.name}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{venue.type}</td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">{venue.capacity}</td>
                            <td className="py-3 px-2 sm:px-4">
                              <Badge className={`${getVenueStatusColor(venue.status)} text-xs`}>
                                {venue.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              {venue.currentBooking?.eventId ? (
                                <div>
                                  <div className="font-medium">{venue.currentBooking.eventId.title}</div>
                                  <div className="text-xs text-gray-500">
                                    {formatDate(venue.currentBooking.startTime)} - {formatDate(venue.currentBooking.endTime)}
                                  </div>
                                </div>
                              ) : (
                                'Available'
                              )}
                            </td>
                            <td className="py-3 px-2 sm:px-4">
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-xs"
                                  onClick={() => handleEditVenue(venue)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                                  onClick={() => handleDeleteVenue(venue._id)}
                                >
                                  Delete
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
                            <td className="py-3 px-2 sm:px-4 text-gray-600 text-xs sm:text-sm">
                              {formatDate(log.timestamp)}
                            </td>
                            <td className="py-3 px-2 sm:px-4 font-medium text-gray-900 text-xs sm:text-sm">
                              {log.user?.name || 'System'}
                            </td>
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
