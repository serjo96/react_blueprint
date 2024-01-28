// PrivateRoute.tsx
import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/features/auth/cotext/useAuth';

export interface PrivateRouteProps {
  path: string;
  element: ReactElement;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} />;
};


export default PrivateRoute;
