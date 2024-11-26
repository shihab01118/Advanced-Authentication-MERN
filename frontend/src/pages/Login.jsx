import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useAuthStore } from '../store/authStore';
import { enqueueSnackbar } from 'notistack';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { isLoading, error, login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/');
      enqueueSnackbar('Login successful!', { variant: 'success' });
    } catch (error) {
      console.log(error);
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
        <h2 className='text-title'>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex justify-between items-center mb-6'>
            <p className='text-red-500 text-sm font-semibold'>
              {error ? error : ''}
            </p>
            <Link
              to='/forgot-password'
              className='text-sm text-green-400 hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='btn-auth'
          >
            {isLoading ? (
              <Loader className='size-6 animate-spin mx-auto' />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-green-400 hover:underline'>
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
