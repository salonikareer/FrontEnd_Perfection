import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon, CheckCircle, XCircle } from 'lucide-react';

const PasswordStrengthMeter = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const calculateStrength = (pass) => {
    let score = 0;
    const checks = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /[0-9]/.test(pass),
      specialChars: /[^A-Za-z0-9]/.test(pass),
    };

    // Basic checks
    if (checks.length) score += 1;
    if (checks.uppercase) score += 1;
    if (checks.lowercase) score += 1;
    if (checks.numbers) score += 1;
    if (checks.specialChars) score += 1;

    // Bonus for length
    if (pass.length > 12) score += 1;
    if (pass.length > 16) score += 1;

    // Penalty for repeated characters
    if (/(.)\1{2,}/.test(pass)) score -= 1;

    // Ensure score is between 0 and 7
    return Math.max(0, Math.min(7, score));
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const getStrengthLabel = () => {
    if (strength === 0) return 'Very Weak';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Moderate';
    if (strength <= 6) return 'Strong';
    return 'Very Strong';
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    if (strength <= 6) return 'bg-green-500';
    return 'bg-green-700';
  };

  const renderCheckItem = (condition, text) => (
    <div className="flex items-center space-x-2">
      {condition ? 
        <CheckCircle className="text-green-500" size={16} /> : 
        <XCircle className="text-red-500" size={16} />
      }
      <span className={condition ? "text-green-700" : "text-red-700"}>{text}</span>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
        </button>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Password Strength:</span>
          <span className={`text-sm font-medium ${getStrengthColor().replace('bg-', 'text-')}`}>
            {getStrengthLabel()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${(strength / 7) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        {renderCheckItem(password.length >= 8, "At least 8 characters long")}
        {renderCheckItem(/[A-Z]/.test(password), "Contains uppercase letter")}
        {renderCheckItem(/[a-z]/.test(password), "Contains lowercase letter")}
        {renderCheckItem(/[0-9]/.test(password), "Contains number")}
        {renderCheckItem(/[^A-Za-z0-9]/.test(password), "Contains special character")}
        {renderCheckItem(password.length > 12, "Over 12 characters (recommended)")}
        {renderCheckItem(!/(.)\1{2,}/.test(password), "No repeated characters")}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;