// routes.js
import RegisterPage from '~/features/auth/pages/register-page';
import LoginPage from '~/features/auth/pages/login-page';
import CalendarPage from '~/features/calendar/pages/calendar-page';
import HomePage from '~/pages/home-page';
import PasswordRecoveryPage from "~/features/auth/pages/password-recovery-page";
import NotFoundPage from "~/features/auth/pages/not-found-page";

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    protected: false
  },
  {
    path: '/sign-in',
    component: LoginPage,
    protected: false
  },
  {
    path: '/sign-up',
    component: RegisterPage,
    protected: false
  },
  {
    path: '/password-recovery',
    component: PasswordRecoveryPage,
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
  {
    path: '*',
    component: NotFoundPage,
    protected: false
  }
];

export default routes;
