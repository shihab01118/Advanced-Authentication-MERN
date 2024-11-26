import { motion } from 'framer-motion';
import Input from '../components/Input';
import { Lock, Mail, User, Loader } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';
import { enqueueSnackbar } from 'notistack';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(name, email, password);
      navigate('/verify-email');
      enqueueSnackbar('Verification email sent!', {
        variant: 'success'
      });
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
        <h2 className='text-title'>Create Account</h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          {error && (
            (<p className='text-red-500 text-sm font-semibold'>{error}</p>)
          )}

          {/* password streng meter */}
          <PasswordStrengthMeter password={password} />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='btn-auth mt-6'
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className='size-6 animate-spin mx-auto' />
            ) : (
              'Signup'
            )}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{' '}
          <Link to='/login' className='text-green-400 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
