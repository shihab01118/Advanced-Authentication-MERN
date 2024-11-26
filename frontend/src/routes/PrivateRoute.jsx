import PropTypes from 'prop-types';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace={true} />;
  }

  if (!user?.isVerified) {
    return <Navigate to='/verify-email' replace={true} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node
};

export default PrivateRoute;
