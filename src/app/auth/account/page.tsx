'use client';
import { createUser, listUsers, UserPayload } from '@/utils/api/users';
import bcrypt from 'bcryptjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import {
  Eye, EyeOff, Mail, Lock, AlertCircle, ArrowLeft, ExternalLink,
  UserCircle2, CheckCircle,  
} from 'lucide-react';

interface LoginFormData {
    employeeNumber: string;
    fullName: string;          // NEW
    email: string;
    password: string;
    confirmPassword: string;   // NEW
}

export default function AuthPage() {

  const router   = useRouter();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading]   = useState(false);
  const [error,     setError]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted]       = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } =
  useForm<LoginFormData>({ mode: 'onChange' });


  /* avoid hydration flash */
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      
      /* -------------------- 1) does user already exist? ------------------- */
      const users = await listUsers();                         // GET /api/users
      const exists = users.some(
        u =>
          u.email.toLowerCase() === data.email.toLowerCase() ||
          u.full_name.toLowerCase() === data.fullName.toLowerCase() ||
          u.employee_number === data.employeeNumber   
      );
  
      if (exists) {
        setError('A user with that Employee number, name or email already exists.');
        return;                                                // ⛔ stop here
      }
  
      /* -------------------- 2) build payload and create ------------------- */
      const payload: UserPayload = {
        employee_number: data.employeeNumber,
        email: data.email,
        password_hash: await bcrypt.hash(data.password, 10),
        full_name: data.fullName,
        role: 'employee',
        is_active: 1,
      };
  
      const { id } = await createUser(payload);                // POST /api/users
        setSuccess(true);
        setTimeout(() => {
          router.push('/auth?created=1');       // or /login
        }, 2500);
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      
    }
    
  };

  

  

  

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full translate-y-1/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto min-h-screen flex flex-col px-4 sm:px-6">
        {/* back-to-home */}
        <div className="pt-8">
          <Link href="/auth" className="text-gray-500 hover:text-gray-700 inline-flex items-center group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Return</span>
          </Link>
        </div>

        {/* main card */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">

            {/* create account form */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
                  
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 mb-6 flex items-start animate-fadeIn">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-red-600">{error}</div>
                  </div>
                )}
               
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                {/* Employee Number    */}
                <div className="space-y-1">
                  <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700">
                    Employee Number
                  </label>

                  <div className="relative rounded-lg shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <UserCircle2 size={18} />
                    </div>

                    <input
                      id="employeeNumber"
                      type="text"
                      placeholder="e.g. 12345"
                      {...register('employeeNumber', {
                        required: 'Employee number is required',
                      })}
                      className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                        errors.employeeNumber
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm sm:text-sm transition-colors`}
                    />

                    {!errors.employeeNumber && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <CheckCircle className="h-5 w-5 text-green-500 opacity-0 transition-opacity data-[valid=true]:opacity-100"
                                    data-valid={!!watch('employeeNumber')} />
                      </div>
                    )}
                  </div>

                  {errors.employeeNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" /> {errors.employeeNumber.message}
                    </p>
                  )}
                </div>
                  
                 {/* Full Name    */}
                <div className="space-y-1">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <UserCircle2 size={18} />
                      </div>
                      <input
                        id="full-name"
                        type="text"
                        placeholder="Your full name"
                        {...register('fullName', {
                          required: 'Full name is required',
                        })}
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                          errors.fullName
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                        } shadow-sm sm:text-sm transition-colors`}
                      />
                      {!errors.fullName && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle className="h-5 w-5 text-green-500 opacity-0 transition-opacity data-[valid=true]:opacity-100"
                                       data-valid={!!register('fullName').name} />
                        </div>
                      )}
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.fullName.message}
                      </p>
                    )}
                  </div>


                  {/* email */}
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
                        placeholder="your@email.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className={`block w-full pl-10 pr-3 py-3 rounded-lg border ${
                          errors.email
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                        } shadow-sm sm:text-sm transition-colors`}
                      />
                      {!errors.email && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <CheckCircle className="h-5 w-5 text-green-500 opacity-0 transition-opacity data-[valid=true]:opacity-100"
                                       data-valid={!!register('email').name} />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* password */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      
                      </div>
                    
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        {...register('password', { required: 'Password is required' })}
                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
                          errors.password
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                        } shadow-sm sm:text-sm transition-colors`}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.password.message}
                      </p>
                    )}
                  </div>


                    {/* verifypassword */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label htmlFor="verifypassword" className="block text-sm font-medium text-gray-700">
                        Verify Password
                      </label>
                      
                      </div>
                    
                    <div className="relative rounded-lg shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        {...register('confirmPassword', {
                            required: 'Please re-enter your password',
                            validate: value => 
                                value === watch('password') || 'Passwords do not match',
                        })}

                        className={`block w-full pl-10 pr-10 py-3 rounded-lg border ${
                          errors.confirmPassword
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-200 focus:ring-blue-500 focus:border-blue-500'
                        } shadow-sm sm:text-sm transition-colors`}
                      />
                      
                    </div>
                    {errors.confirmPassword  && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword .message}
                      </p>
                    )}
                  </div>
                 

                  {/* submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Create account'
                    )}
                  </button>
                  {success && (
                    <div className="rounded-lg bg-green-50 p-4 mb-6 flex items-start animate-fadeIn">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-green-700">
                        Account created! Redirecting to login…
                      </div>
                    </div>
                  )}
                </form>
               

                <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <a href="/auth" className="text-blue-600 hover:underline">Log in</a>
              </p>
              </div>
              

              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
