import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Library from './pages/Library';
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './context/AuthContext';

// PrivateRoute component to check if user is authenticated
const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  // Check if user exists and has a valid email
  const isValidUser = user && typeof user.email === 'string' && user.email.length > 0;

  return isValidUser ? element : <Navigate to="/" replace />;
};

function Router() {
  return (
    <AuthProvider>
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Home />} />

      {/* Protected Routes wrapped in Layout */}
      <Route element={<MainLayout />}>
        <Route
          path="/library"
          element={<PrivateRoute element={<Library />} />} 
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />} 
        />
      </Route>
    </Routes>
    </AuthProvider>
  ); 
}

export default Router;
