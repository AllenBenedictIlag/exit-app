'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect, ReactNode } from 'react';

interface NavbarProps {
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleLogout = () => {
    // In a real app, you would perform logout operations here
    // For now, just redirect to the login page
    router.push('/auth');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {children}
            <Link href="/dashboard" className="flex items-center">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
                Exit Interview System
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="relative" ref={dropdownRef}>
              <button 
                className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
              >
                <div className="hidden lg:flex items-center mr-2">
                  <span className="text-base font-normal text-gray-600">John Doe</span>
                </div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600">
                  <User className="w-5 h-5" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden z-50">
                  <div className="py-2 px-4 bg-gray-50 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">John Doe</p>
                    <p className="text-xs text-gray-500">admin@example.com</p>
                  </div>
                  <div className="py-1">
                    <Link 
                      href="/admin/settings" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Account Settings
                    </Link>
                    <button 
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;