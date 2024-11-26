import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import PropTypes from 'prop-types';

const RedirectAuthenticatedUser = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace={true} />;
  }

  return children;
};

RedirectAuthenticatedUser.propTypes = {
  children: PropTypes.node
};

export default RedirectAuthenticatedUser;
