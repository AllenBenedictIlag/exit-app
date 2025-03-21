'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2, KeyRound, Eye, EyeOff } from 'lucide-react';

interface ForgotPasswordFormData {
  email: string;
}

interface ResetCodeFormData {
  code: string;
}

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [stage, setStage] = useState<'email' | 'verification' | 'newPassword' | 'complete'>('email');
  const [email, setEmail] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form handling for email stage
  const { 
    register: registerEmail, 
    handleSubmit: handleEmailSubmit, 
    formState: { errors: emailErrors } 
  } = useForm<ForgotPasswordFormData>({
    mode: 'onChange'
  });
  
  // Form handling for verification stage
  const { 
    register: registerVerification, 
    handleSubmit: handleVerificationSubmit, 
    formState: { errors: verificationErrors } 
  } = useForm<ResetCodeFormData>({
    mode: 'onChange'
  });
  
  // Form handling for new password stage
  const { 
    register: registerPassword,
    watch: watchPassword, 
    handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors } 
  } = useForm<NewPasswordFormData>({
    mode: 'onChange'
  });
  
  // Watch password to check strength
  const password = watchPassword ? watchPassword('password', '') : '';
  
  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 1;
    
    // Number check
    if (/[0-9]/.test(password)) strength += 1;
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  };
  
  // Handle email submission
  const onEmailSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    setEmail(data.email);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call an API to send a verification code
      setSuccess('Verification code sent to your email');
      setStage('verification');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle verification code submission
  const onVerificationSubmit = async (data: ResetCodeFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - any 6 digit code will work
      if (/^\d{6}$/.test(data.code)) {
        setSuccess('Verification successful');
        setStage('newPassword');
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle new password submission
  const onPasswordSubmit = async (data: NewPasswordFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call an API to reset the password
      setSuccess('Password reset successfully');
      setStage('complete');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get strength color based on password strength
  const getStrengthColor = () => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
    
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Get feedback message based on strength
  const getPasswordFeedback = () => {
    if (!password) return '';
    
    const strength = calculatePasswordStrength(password);
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Good';
    return 'Strong';
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col justify-center p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => {
              if (stage === 'verification') setStage('email');
              else if (stage === 'newPassword') setStage('verification');
              else if (stage === 'email') window.history.back();
            }}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 group"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>{stage === 'email' ? 'Back to login' : 'Previous step'}</span>
          </button>
        </div>
        
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200 transition-all duration-300">
          <div className="text-center mb-8">
            {stage !== 'complete' && (
              <div className="inline-block bg-blue-100 p-3 rounded-full mx-auto mb-4">
                {stage === 'email' && <Mail className="h-8 w-8 text-blue-600" />}
                {stage === 'verification' && <CheckCircle className="h-8 w-8 text-blue-600" />}
                {stage === 'newPassword' && <KeyRound className="h-8 w-8 text-blue-600" />}
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-gray-900">
              {stage === 'email' && 'Reset Your Password'}
              {stage === 'verification' && 'Verify Your Email'}
              {stage === 'newPassword' && 'Create New Password'}
              {stage === 'complete' && 'Password Reset Complete'}
            </h1>
            <p className="text-gray-600 mt-2">
              {stage === 'email' && 'Enter your email to receive a verification code'}
              {stage === 'verification' && `We've sent a 6-digit code to ${email}`}
              {stage === 'newPassword' && 'Create a new secure password'}
              {stage === 'complete' && 'Your password has been reset successfully'}
            </p>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-6 flex items-start animate-fadeIn">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          
          {/* Success message */}
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-6 flex items-start animate-fadeIn">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-green-700">{success}</div>
            </div>
          )}
          
          {/* Step 1: Email Form */}
          {stage === 'email' && (
            <form className="space-y-6" onSubmit={handleEmailSubmit(onEmailSubmit)}>
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-3 rounded-md border ${
                      emailErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm sm:text-sm transition-colors`}
                    placeholder="your@email.com"
                    {...registerEmail('email', { 
                      required: 'Email is required',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                        message: 'Invalid email address' 
                      } 
                    })}
                  />
                </div>
                {emailErrors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {emailErrors.email.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Sending verification code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          )}
          
          {/* Step 2: Verification Form */}
          {stage === 'verification' && (
            <form className="space-y-6" onSubmit={handleVerificationSubmit(onVerificationSubmit)}>
              <div className="space-y-1">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  className={`block w-full px-4 py-3 rounded-md border ${
                    verificationErrors.code ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } shadow-sm sm:text-sm text-center tracking-widest font-mono text-lg transition-colors`}
                  placeholder="000000"
                  {...registerVerification('code', { 
                    required: 'Verification code is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'Code must be 6 digits'
                    }
                  })}
                />
                {verificationErrors.code && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {verificationErrors.code.message}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Didn't receive a code? <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">Resend</button>
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </form>
          )}
          
          {/* Step 3: New Password Form */}
          {stage === 'newPassword' && (
            <form className="space-y-6" onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
              {/* New Password */}
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 rounded-md border ${
                      passwordErrors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm sm:text-sm transition-colors`}
                    placeholder="Create a new password"
                    {...registerPassword('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {passwordErrors.password.message}
                  </p>
                )}
                
                {/* Password strength meter */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength <= 2 ? 'text-red-500' : 
                        passwordStrength <= 4 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {getPasswordFeedback()}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor()} transition-all duration-300`} 
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    {passwordStrength > 0 && passwordStrength <= 2 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Try adding numbers, symbols, and mixed case letters.
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <KeyRound size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-3 rounded-md border ${
                      passwordErrors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm sm:text-sm transition-colors`}
                    placeholder="Confirm your new password"
                    {...registerPassword('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Resetting password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          )}
          
          {/* Step 4: Complete */}
          {stage === 'complete' && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <p className="text-center text-gray-700">
                Your password has been reset successfully. You can now login with your new password.
              </p>
              
              <div className="pt-4">
                <Link 
                  href="/auth"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 