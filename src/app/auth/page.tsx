'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft, 
  ExternalLink, Building2, UserCircle2, CheckCircle, ShieldCheck 
} from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'employee' | 'admin'>('employee');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
    
    // Check URL parameters to set the active tab
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'admin') {
        setActiveTab('admin');
      }
    }
  }, []);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    mode: 'onChange'
  });
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Handle tab switch
  const switchTab = (tab: 'employee' | 'admin') => {
    setActiveTab(tab);
    setError('');
  };
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeTab === 'employee') {
        // Employee login logic
        if (data.email === 'employee@example.com' && data.password === 'password') {
          router.push('/exit-interviews/my-interviews');
        } else {
          setError('Invalid credentials. Try employee@example.com/password');
        }
      } else {
        // Admin login logic
        if (data.email === 'admin@example.com' && data.password === 'password') {
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 rounded-full -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full translate-y-1/3 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto h-screen flex flex-col px-4 sm:px-6">
        {/* Return to home link */}
        <div className="pt-8">
          <Link 
            href="/" 
            className="text-gray-500 hover:text-gray-700 inline-flex items-center group transition-all duration-200"
          >
            <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Authentication container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xl text-gray-600 mt-4 max-w-md">
                  Sign in to the Exit Interview System to continue your session
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 shadow-sm hidden md:block">
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100/50 rounded-full p-3 mt-1">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Your feedback matters</h3>
                    <p className="text-gray-600 mt-1 text-sm">
                      The exit interview process helps us improve our workplace and create better experiences for everyone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="hidden md:block">
                <div className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                  <ExternalLink size={14} className="mr-1" />
                  <span>Support Resources</span>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Your session is protected with enterprise-grade encryption
                </p>
              </div>
            </div>
            
            {/* Right side - Login form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Tab navigation */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => switchTab('employee')}
                  className={`flex-1 py-4 px-4 flex justify-center items-center gap-2 font-medium text-sm transition-colors ${
                    activeTab === 'employee' 
                      ? 'text-blue-600 border-b-2 border-blue-500' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <UserCircle2 className={`w-5 h-5 ${activeTab === 'employee' ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span>Employee Login</span>
                </button>
                <button
                  onClick={() => switchTab('admin')}
                  className={`flex-1 py-4 px-4 flex justify-center items-center gap-2 font-medium text-sm transition-colors ${
                    activeTab === 'admin' 
                      ? 'text-indigo-600 border-b-2 border-indigo-500' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <ShieldCheck className={`w-5 h-5 ${activeTab === 'admin' ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span>HR Admin Login</span>
                </button>
              </div>
              
              {/* Form container */}
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${
                    activeTab === 'employee' ? 'bg-blue-100' : 'bg-indigo-100'
                  } mb-4`}>
                    {activeTab === 'employee' ? (
                      <UserCircle2 className="h-7 w-7 text-blue-600" />
                    ) : (
                      <ShieldCheck className="h-7 w-7 text-indigo-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'employee' ? 'Employee Sign In' : 'HR Admin Sign In'}
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm">
                    {activeTab === 'employee' 
                      ? 'Complete your exit interview or access previous responses' 
                      : 'Analyze exit data and generate insights'}
                  </p>
                </div>
                
                {/* Error message */}
                {error && (
                  <div className="rounded-lg bg-red-50 p-4 mb-6 flex items-start animate-fadeIn">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-600">{error}</div>
                  </div>
                )}
                
                {/* Login form */}
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Mail size={18} />
                      </div>
                      <input
                        id="email"
                        type="email"
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : `border-gray-200 ${activeTab === 'employee' 
                                ? 'focus:ring-blue-500 focus:border-blue-500' 
                                : 'focus:ring-indigo-500 focus:border-indigo-500'}`
                        } shadow-sm sm:text-sm transition-colors`}
                        placeholder={activeTab === 'employee' ? "your@email.com" : "admin@company.com"}
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: { 
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                            message: 'Invalid email address' 
                          } 
                        })}
                      />
                      {!errors.email && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle className="h-5 w-5 text-green-500 opacity-0 transition-opacity data-[valid=true]:opacity-100" data-valid={!!register('email').name} />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Password field */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link 
                        href="/auth/forgot-password" 
                        className={`text-xs font-medium ${
                          activeTab === 'employee' 
                            ? 'text-blue-600 hover:text-blue-800' 
                            : 'text-indigo-600 hover:text-indigo-800'
                        } transition-colors`}
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
                          errors.password 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : `border-gray-200 ${activeTab === 'employee' 
                                ? 'focus:ring-blue-500 focus:border-blue-500' 
                                : 'focus:ring-indigo-500 focus:border-indigo-500'}`
                        } shadow-sm sm:text-sm transition-colors`}
                        placeholder="Enter password"
                        {...register('password', { 
                          required: 'Password is required',
                        })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.password.message}
                      </p>
                    )}
                  </div>
                  
                  {/* Remember me */}
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className={`h-4 w-4 rounded border-gray-300 ${
                        activeTab === 'employee' ? 'text-blue-600 focus:ring-blue-500' : 'text-indigo-600 focus:ring-indigo-500'
                      } transition-colors`}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                      Remember me for 30 days
                    </label>
                  </div>
                  
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                      activeTab === 'employee'
                        ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign in to continue'
                    )}
                  </button>
                  
                  {/* Support info - mobile version */}
                  <div className="text-center text-sm text-gray-500 mt-4 md:hidden">
                    Don't have an account? Contact your HR department for assistance.
                    <div className="mt-2 flex justify-center">
                      <div className="inline-flex items-center text-sm text-blue-600">
                        <ExternalLink size={14} className="mr-1" />
                        <span>Support Resources</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Security indicator */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Your session is protected with enterprise-grade encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}