import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/features/auth/cotext/useAuth';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect to the login page if the user is not authenticated,
    // maintaining the current location in a state to return the user back after authentication
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children; // Display child components if user is authenticated
};

export default RequireAuth;
