import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import EmailVerification from '../pages/EmailVerification';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'verify-email',
        element: <EmailVerification />
      }
    ]
  }
]);

export default router;
