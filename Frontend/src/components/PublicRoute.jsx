import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // If authenticated, redirect them away from login/register to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // If not authenticated, render the login/register pages
  return <Outlet />;
};

export default PublicRoute;
