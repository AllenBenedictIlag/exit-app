'use client';

import React from 'react';

const LoginLogo: React.FC = () => {
  return (
    <div className="mx-auto h-16 w-16 text-center mb-4">
      <div className="rounded-full bg-blue-600 h-16 w-16 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-10 h-10 text-white"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" 
          />
        </svg>
      </div>
    </div>
  );
};

export default LoginLogo; 