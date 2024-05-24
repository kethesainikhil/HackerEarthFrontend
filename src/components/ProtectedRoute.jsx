// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userId")

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
