'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  
  const handleLogout = () => {
    // In a real app, you would perform logout operations here
    // For now, just redirect to the login page
    router.push('/auth');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/dashboard" className="flex items-center">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                Exit Interview System
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden lg:flex items-center">
              <span className="text-base font-normal text-gray-500 mr-5">John Doe</span>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="w-6 h-6 text-gray-500" />
              </button>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;