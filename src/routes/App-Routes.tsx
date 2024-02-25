import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import routes from './routes';
import { useAuth } from '~/features/auth/cotext/useAuth';
import ErrorBoundary from '~/components/error-boundary';
import ErrorPage from '~/pages/error-page';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          {routes.map((route, index) => {
            if (route.protected && !isAuthenticated) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Navigate to="/sign-in" />}
                />
              );
            }
            return <Route key={index} path={route.path} element={route.component()} />
          })}
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default AppRoutes;
