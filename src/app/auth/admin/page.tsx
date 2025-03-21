'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/auth?tab=admin');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin login...</p>
      </div>
    </div>
  );
} 