import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState([
    '',
    '',
    '',
    '',
    '',
    ''
  ]);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { isLoading, error, verifyEmail } = useAuthStore();
  console.log(error);

  const handleChange = (index, value) => {
    const newCode = [...verificationCode];

    // handle pasted value
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');

      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setVerificationCode(newCode);

      // focus on the last non-empty input or the first empty input
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setVerificationCode(newCode);

      // focus on the next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      await verifyEmail(verificationCode.join(''));
      navigate('/');
      enqueueSnackbar('Email verified successfully!', {
        variant: 'success'
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='auth-card'
    >
      <div className='p-8'>
        <h2 className='text-title'>Verify Your Email</h2>
        <p className='text-center text-gray-300 mb-6'>
          Enter the 6-digit code sent to your email address.
        </p>
        <form onSubmit={handleVerifyEmail} className='space-y-6'>
          <div className='flex justify-between'>
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type='text'
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
              />
            ))}
          </div>
          {error && (
            <p className='text-red-500 text-center text-sm font-semibold'>
              {error}
            </p>
          )}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='btn-auth'
          >
            {isLoading ? (
              <Loader className='size-6 mx-auto animate-spin' />
            ) : (
              'Verify Email'
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailVerification;
