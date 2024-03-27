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
            route.protected ? (
              <Route
                key={index}
                path={route.path}
                element={<RequireAuth>{route.component()}</RequireAuth>}
              />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={route.component()}
              />
            )
          )}
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default AppRoutes;
