// routes.js
import RegisterPage from '~/features/auth/pages/register-page';
import LoginPage from '~/features/auth/pages/login-page';
import CalendarPage from '~/features/calendar/pages/calendar-page';
import HomePage from '~/pages/home-page';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    protected: false
  },
  {
    path: '/login',
    component: LoginPage,
    protected: false
  },
  {
    path: '/register',
    component: RegisterPage,
    protected: false
  },
  {
    path: '/calendar',
    component: CalendarPage,
    protected: true
  },
  // Другие маршруты
];

export default routes;
