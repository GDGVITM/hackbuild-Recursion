import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import LandingPage from '../pages/common/LandingPage';
import Dashboard from '../pages/user/Dashboard';
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

// Public Route Component (only for signed out users)
const PublicRoute = ({ children }) => {
  return (
    <>
      <SignedOut>
        {children}
      </SignedOut>
      <SignedIn>
        <Navigate to="/user/dashboard" replace />
      </SignedIn>
    </>
  );
};

const AppRouter = () => {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Clerk Publishable Key');
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
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

          {/* User Profile - Protected Route */}
          <Route 
            path="/user/profile" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">User Profile</h1>
                    <p className="text-gray-600">Profile page coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Events Page - Protected Route */}
          <Route 
            path="/events" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Events</h1>
                    <p className="text-gray-600">Events page coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Stats Page - Protected Route */}
          <Route 
            path="/stats" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h1>
                    <p className="text-gray-600">Stats page coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
};

export default AppRouter;
