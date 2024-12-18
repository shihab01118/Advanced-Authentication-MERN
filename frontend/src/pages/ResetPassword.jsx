import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import { Lock } from 'lucide-react';
import { enqueueSnackbar } from 'notistack';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }
    try {
      await resetPassword(token, password);

      enqueueSnackbar('Password reset successful! Redirecting to login...', {
        variant: 'success'
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Error resetting password', {
        variant: error
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='auth-card'
    >
      <div className='p-8'>
        <h2 className='text-title'>Reset Password</h2>
        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
        {message && <p className='text-green-500 text-sm mb-4'>{message}</p>}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type='password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='btn-auth'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Please Wait...' : 'Set New Password'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
