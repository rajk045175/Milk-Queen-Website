import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If logged in under another role, redirect to their home dashboard
    if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (currentUser.role === 'farmer') return <Navigate to="/farmer/dashboard" replace />;
    if (currentUser.role === 'delivery') return <Navigate to="/delivery/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
