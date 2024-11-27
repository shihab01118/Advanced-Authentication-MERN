import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
      setIsSubmitted(false);
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
        <h2 className='text-title'>Forgot Password</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className='text-gray-300 mb-6 text-center'>
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && (
              <p className='text-red-500 text-sm font-semibold mb-4 text-center'>
                {error}
              </p>
            )}
            <motion.button
              whileTap={{ scale: 0.98 }}
              className='btn-auth'
              type='submit'
            >
              {isLoading ? (
                <Loader className='size-6 animate-spin mx-auto' />
              ) : (
                'Send Reset Link'
              )}
            </motion.button>
          </form>
        ) : (
          <div className='text-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
            >
              <Mail className='h-8 w-8 text-white' />
            </motion.div>
            <p className='text-gray-300 mb-6'>
              Please check your email. You will receive a password reset link
              shortly.
            </p>
          </div>
        )}
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <Link
          to={'/login'}
          className='text-sm text-green-400 hover:underline flex items-center'
        >
          <ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
