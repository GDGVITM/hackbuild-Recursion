import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/common/LandingPage';
import Dashboard from '../pages/user/Dashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import OrganiserDashboard from '../pages/organiser/OrganiserDashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import CancellationRefunds from '../pages/common/CancellationRefunds';
import TermsConditions from '../pages/common/TermsConditions';
import Shipping from '../pages/common/Shipping';
import Privacy from '../pages/common/Privacy';
import Payment from '../pages/common/Payment';
import PaymentSuccess from '../pages/common/PaymentSuccess';

import EventDetails from '../pages/common/EventDetails';
import EventsList from '../pages/common/EventsList';


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return children;
};

// Admin Route Component (only for admin users)
const AdminRoute = ({ children }) => {
  return children;
};

// Organiser Route Component (only for organiser users)
const OrganiserRoute = ({ children }) => {
  return children;
};

// Public Route Component (only for signed out users)
const PublicRoute = ({ children }) => {
  return children;
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

          {/* Event Details Page - Protected */}
  <Route
    path="/events/:id"
    element={
      <ProtectedRoute>
        <EventDetails />
      </ProtectedRoute>
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
                <EventsList />
              </ProtectedRoute>
            } 
          />

          <Route
  path="/events/:id"
  element={
    <ProtectedRoute>
      <EventDetails />
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

          {/* Policy Pages - Public Routes (for Razorpay KYC) */}
          <Route path="/cancellation-refunds" element={<CancellationRefunds />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Payment Route */}
          <Route path="/payment" element={<Payment />} />

          {/* Payment Success Route */}
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    
  );
};

export default AppRouter;
