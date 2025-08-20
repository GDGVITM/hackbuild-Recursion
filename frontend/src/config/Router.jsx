import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import LandingPage from '../pages/common/LandingPage';
import Dashboard from '../pages/user/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import OrganiserDashboard from '../pages/organiser/OrganiserDashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
};

// Admin Route Component (only for admin users)
const AdminRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
};

// Organiser Route Component (only for organiser users)
const OrganiserRoute = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <Navigate to="/" replace />
      </SignedOut>
    </>
  );
};

// Public Route Component (only for signed out users)
const PublicRoute = ({ children }) => {
  const { user } = useUser();
  
  // Check if user is admin or organiser based on email
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'theeventhub2025@gmail.com';
  const isOrganiser = user?.primaryEmailAddress?.emailAddress === 'tanishq7msd@gmail.com';
  
  return (
    <>
      <SignedOut>
        {children}
      </SignedOut>
      <SignedIn>
        {isAdmin ? (
          <Navigate to="/admin/dashboard" replace />
        ) : isOrganiser ? (
          <Navigate to="/organiser/dashboard" replace />
        ) : (
          <Navigate to="/user/dashboard" replace />
        )}
      </SignedIn>
    </>
  );
};

const AppRouter = () => {
  
  return (
    
      <Router>
        <Routes>
          {/* Landing Page - Public Route */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />

          {/* Authentication Routes - Public Routes */}
          <Route 
            path="/auth/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route 
            path="/auth/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />

          {/* User Dashboard - Protected Route */}
          <Route 
            path="/user/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Dashboard - Protected Route */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Organiser Dashboard - Protected Route */}
          <Route 
            path="/organiser/dashboard" 
            element={
              <OrganiserRoute>
                <OrganiserDashboard />
              </OrganiserRoute>
            } 
          />

          {/* User Profile - Protected Route */}
          <Route 
            path="/user/profile" 
            element={
              <ProtectedRoute>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h1>
                  <p className="text-gray-600">Profile page coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Events Page - Protected Route */}
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Events</h1>
                  <p className="text-gray-600">Events page coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Stats Page - Protected Route */}
          <Route 
            path="/stats" 
            element={
              <ProtectedRoute>
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h1>
                  <p className="text-gray-600">Stats page coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    
  );
};

export default AppRouter;
