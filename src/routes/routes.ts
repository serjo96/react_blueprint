import RegisterPage from '~/features/auth/pages/register-page';
import LoginPage from '~/features/auth/pages/login-page';
import HomePage from '~/pages/home-page';
import PasswordRecoveryPage from '~/features/auth/pages/password-recovery-page';
import ProfilePage from '~/features/profile/pages/profile-page';
import ResendConfirmation from '~/pages/resend-confirmation';
import NotFoundPage from '~/pages/not-found-page';
import ProtectedPage from '~/pages/protected-page';
import ErrorPage from '~/pages/error-page';

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    protected: false,
  },
  {
    path: '/sign-in',
    component: LoginPage,
    protected: false,
  },
  {
    path: '/sign-up',
    component: RegisterPage,
    protected: false,
  },
  {
    path: '/password-recovery',
    component: PasswordRecoveryPage,
    protected: false,
  },
  {
    path: '/resend-conformation',
    component: ResendConfirmation,
    protected: false,
  },
  {
    path: '/profile',
    component: ProfilePage,
    protected: true,
  },
  {
    path: '/protected-page',
    component: ProtectedPage,
    protected: true,
  },
  {
    path: '/error',
    component: ErrorPage,
    protected: false,
  },
  {
    path: '*',
    component: NotFoundPage,
    protected: false,
  },
];

export default routes;
