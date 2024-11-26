import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <motion.div
        className='w-12 h-12 border-t-2 border-b-2 border-green-500 rounded-full animate-spin'
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default LoadingSpinner;
