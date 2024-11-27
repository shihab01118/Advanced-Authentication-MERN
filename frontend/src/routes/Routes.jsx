import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import EmailVerification from '../pages/EmailVerification';
import RedirectAuthenticatedUser from './RedirectAuthenticatedUser';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: 'signup',
        element: (
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        )
      },
      {
        path: 'login',
        element: (
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        )
      },
      {
        path: 'verify-email',
        element: <EmailVerification />
      },
      {
        path: 'forgot-password',
        element: (
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        )
      },
      {
        path: 'reset-password/:token',
        element: (
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        )
      }
    ]
  }
]);

export default router;
