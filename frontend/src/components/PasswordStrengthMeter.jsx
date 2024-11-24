import { Check, X } from 'lucide-react';
import PropTypes from 'prop-types';

const PasswordCriteria = ({ password }) => {
  const criterias = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains uppercase letter', met: /[a-z]/.test(password) },
    { label: 'Conatains a number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[^A-Za-z\d]/.test(password) }
  ];

  return (
    <div className='mt-2 space-y-1'>
      {criterias.map((criteria, index) => (
        <div key={index} className='flex items-center text-xs'>
          {criteria.met ? (
            <Check className='size-4 text-green-500 mr-2' />
          ) : (
            <X className='size-4 text-gray-500 mr-2' />
          )}
          <span className={criteria.met ? 'text-green-500' : 'text-gray-400'}>
            {criteria.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return '';
    if (strength === 1) return 'Weak';
    if (strength === 2) return 'Medium';
    if (strength === 3) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = (strength) => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-red-400';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-1'>
        <span className='text-xs text-gray-400'>Password Strength</span>
        <span className='text-xs text-gray-400'>
          {getStrengthText(strength)}
        </span>
      </div>

      <div className='flex space-x-1'>
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              idx < strength ? getStrengthColor(strength) : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

PasswordCriteria.propTypes = {
  password: PropTypes.string.isRequired
};
PasswordStrengthMeter.propTypes = {
  password: PropTypes.string.isRequired
};

export default PasswordStrengthMeter;
