import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Mock user data for demo - replace with actual API calls
  const mockUsers = {
    student: {
      id: '1',
      name: 'John Doe',
      email: 'john@student.com',
      role: 'student',
      studentId: 'STU001',
      department: 'Computer Science',
      profileImage: null
    },
    volunteer: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@volunteer.com',
      role: 'volunteer',
      studentId: 'STU002',
      department: 'Electrical Engineering',
      profileImage: null
    },
    organizer: {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@organizer.com',
      role: 'organizer',
      studentId: 'STU003',
      department: 'Mechanical Engineering',
      profileImage: null
    },
    admin: {
      id: '4',
      name: 'Admin User',
      email: 'admin@eventhub.com',
      role: 'admin',
      studentId: 'ADM001',
      department: 'Administration',
      profileImage: null
    }
  };

  useEffect(() => {
    // Check if user is logged in on app load
    if (token) {
      // In a real app, validate token with backend
      const userRole = localStorage.getItem('userRole') || 'student';
      setUser(mockUsers[userRole]);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock login logic - replace with actual API call
      let userRole = 'student';
      if (email.includes('volunteer')) userRole = 'volunteer';
      else if (email.includes('organizer')) userRole = 'organizer';
      else if (email.includes('admin')) userRole = 'admin';

      const mockToken = `mock-jwt-token-${userRole}-${Date.now()}`;
      const userData = mockUsers[userRole];

      // Store in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', userRole);
      
      setToken(mockToken);
      setUser(userData);

      toast.success(`Welcome back, ${userData.name}!`);
      
      // Redirect based on role
      navigate(`/dashboard/${userRole}`);
      
      return { success: true, user: userData };
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      
      // Mock registration logic - replace with actual API call
      const mockToken = `mock-jwt-token-${userData.role}-${Date.now()}`;
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        profileImage: null
      };

      // Store in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userRole', userData.role);
      
      setToken(mockToken);
      setUser(newUser);

      toast.success('Registration successful! Welcome to EventHub!');
      
      // Redirect based on role
      navigate(`/dashboard/${userData.role}`);
      
      return { success: true, user: newUser };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setToken(null);
    setUser(null);
    navigate('/');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      // Mock profile update - replace with actual API call
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
      return { success: true, user: updatedUser };
    } catch (error) {
      toast.error('Profile update failed');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isVolunteer: user?.role === 'volunteer',
    isOrganizer: user?.role === 'organizer',
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
