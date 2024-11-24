import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

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

  const handleChange = (index, value) => {};

  const handleKeyDown = (index, e) => {};

  const handleVerifyEmail = (e) => {
    e.preventDefault();
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='btn-auth'
          >
            Verify Email
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailVerification;
