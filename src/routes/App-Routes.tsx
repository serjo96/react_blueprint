import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from './routes';
import ErrorBoundary from '~/components/error-boundary';
import ErrorPage from '~/pages/error-page';
import RequireAuth from '~/routes/private-route';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Routes>
          {routes.map((route, index) =>
            (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <RequireAuth>
                      <route.component /> {/* Используйте component напрямую в JSX */}
                    </RequireAuth>
                  ) : (
                    <route.component /> // Также напрямую в JSX
                  )
                }
              />
            )
          )}
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default AppRoutes;
