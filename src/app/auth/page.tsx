'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import LoginLogo from '@/components/ui/LoginLogo';
import SvgImage from '@/components/ui/SvgImage';
// Remove all Lucide imports as we'll use SvgImage instead
// import { Eye, EyeOff, Mail, Lock, User, Check, X, AlertCircle, Github, Facebook, Twitter } from 'lucide-react';

interface LoginFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

export default function Auth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<LoginFormData>({
    mode: 'onChange'
  });
  
  const password = watch('password', '');
  
  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    reset();
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordFeedback('');
      return;
    }
    
    let strength = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) {
      strength += 1;
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 1;
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 1;
    }
    
    // Number check
    if (/[0-9]/.test(password)) {
      strength += 1;
    }
    
    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    }
    
    // Set feedback message
    if (strength === 0) {
      feedback = 'Enter a password';
    } else if (strength <= 2) {
      feedback = 'Weak';
    } else if (strength <= 4) {
      feedback = 'Good';
    } else {
      feedback = 'Strong';
    }
    
    setPasswordStrength(strength);
    setPasswordFeedback(feedback);
  }, [password]);
  
  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isSignUp) {
        // In a real app, you would call your signup API
        // For demo purposes, we simulate a successful signup
        if (data.password !== data.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        // Simulate successful registration
        router.push('/dashboard');
      } else {
        // Mock login validation
        if ((data.email === 'admin@example.com' || data.username === 'admin') && data.password === 'password') {
          router.push('/dashboard');
        } else {
          setError('Invalid credentials. Try admin@example.com/password');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <div className="flex justify-center mb-4">
        <LoginLogo />
      </div>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-gray-600 mt-1">
          {isSignUp ? 'Sign up to get started' : 'Sign in to your account'}
        </p>
      </div>
      
      {/* Auth mode toggle - IMPROVED */}
      <div className="mb-6">
        <div className="text-sm text-center text-gray-600 mb-2">Choose an option:</div>
        <div className="flex rounded-md shadow-sm bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`w-1/2 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center justify-center ${
              !isSignUp ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-pressed={!isSignUp}
          >
            <SvgImage name="user" size={16} className={!isSignUp ? "text-blue-600 mr-1.5" : "text-gray-600 mr-1.5"} />
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`w-1/2 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex items-center justify-center ${
              isSignUp ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
            aria-pressed={isSignUp}
          >
            <SvgImage name="userPlus" size={16} className={isSignUp ? "text-blue-600 mr-1.5" : "text-gray-600 mr-1.5"} />
            Sign Up
          </button>
        </div>
      </div>
      
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4 flex items-start">
          <SvgImage name="alertCircle" className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" size={20} />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}
      
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Email field (always shown) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SvgImage name="mail" size={18} />
            </div>
            <input
              id="email"
              type="email"
              className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } shadow-sm sm:text-sm`}
              placeholder="your@email.com"
              {...register('email', { 
                required: isSignUp ? 'Email is required' : false,
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                  message: 'Invalid email address' 
                } 
              })}
            />
            {errors.email && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <SvgImage name="x" className="h-5 w-5 text-red-500" size={20} />
              </div>
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <SvgImage name="alertCircle" size={14} className="mr-1" /> {errors.email.message}
            </p>
          )}
        </div>
        
        {/* Username (optional for login, required for signup) */}
        {!isSignUp && (
          <div className="flex items-center justify-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
        )}
        
        {(!isSignUp || isSignUp) && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username {!isSignUp && <span className="text-gray-400 text-xs">(alternative to email)</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <SvgImage name="user" size={18} />
              </div>
              <input
                id="username"
                type="text"
                className={`block w-full pl-10 pr-3 py-2 rounded-md border ${
                  errors.username ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } shadow-sm sm:text-sm`}
                placeholder="username"
                {...register('username', {
                  required: isSignUp ? 'Username is required' : (!watch('email') ? 'Email or username is required' : false),
                  minLength: { value: 3, message: 'Username must be at least 3 characters' }
                })}
              />
              {errors.username && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <SvgImage name="x" className="h-5 w-5 text-red-500" size={20} />
                </div>
              )}
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <SvgImage name="alertCircle" size={14} className="mr-1" /> {errors.username.message}
              </p>
            )}
          </div>
        )}
        
        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <SvgImage name="lock" size={18} />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`block w-full pl-10 pr-10 py-2 rounded-md border ${
                errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } shadow-sm sm:text-sm`}
              placeholder={isSignUp ? "Create password" : "Enter password"}
              {...register('password', { 
                required: 'Password is required',
                minLength: isSignUp ? { value: 8, message: 'Password must be at least 8 characters' } : undefined
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <SvgImage name="eyeOff" className="h-5 w-5" size={20} />
              ) : (
                <SvgImage name="eye" className="h-5 w-5" size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <SvgImage name="alertCircle" size={14} className="mr-1" /> {errors.password.message}
            </p>
          )}
          
          {/* Password strength meter (signup only) */}
          {isSignUp && password && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-700">Password strength:</span>
                <span className={`text-xs font-medium ${
                  passwordStrength <= 2 ? 'text-red-500' : 
                  passwordStrength <= 4 ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {passwordFeedback}
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
        
        {/* Confirm Password (signup only) */}
        {isSignUp && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <SvgImage name="lock" size={18} />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`block w-full pl-10 pr-10 py-2 rounded-md border ${
                  errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } shadow-sm sm:text-sm`}
                placeholder="Confirm password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <SvgImage name="eyeOff" className="h-5 w-5" size={20} />
                ) : (
                  <SvgImage name="eye" className="h-5 w-5" size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <SvgImage name="alertCircle" size={14} className="mr-1" /> {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}
        
        {/* Remember me & Forgot password (login only) */}
        {!isSignUp && (
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">
              Forgot password?
            </a>
          </div>
        )}
        
        {/* Submit button - IMPROVED */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isSignUp ? 'Creating account...' : 'Signing in...'}
            </>
          ) : (
            <>
              {isSignUp ? (
                <>
                  <SvgImage name="userPlus" size={18} className="mr-2 text-white" />
                  Create Account
                </>
              ) : (
                <>
                  <SvgImage name="logOut" size={18} className="mr-2 text-white transform rotate-180" />
                  Continue to Dashboard
                </>
              )}
            </>
          )}
        </button>
        
        {/* Social login options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <SvgImage name="facebook" size={18} className="text-blue-600" />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <SvgImage name="twitter" size={18} className="text-blue-400" />
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <SvgImage name="github" size={18} className="text-gray-800" />
            </button>
          </div>
        </div>
      </form>
      
      {/* Toggle auth mode link - IMPROVED */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp 
            ? 'Already have an account? ' 
            : "Don't have an account? "}
          <button 
            type="button"
            onClick={toggleAuthMode}
            className="font-medium text-blue-600 hover:underline transition-colors"
          >
            {isSignUp ? 'Login here' : 'Register now'}
          </button>
        </p>
      </div>
    </div>
  );
}