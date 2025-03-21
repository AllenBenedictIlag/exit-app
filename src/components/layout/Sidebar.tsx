'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, BarChart2, Settings } from 'lucide-react';
import { ReactNode } from 'react';

// Create a context to share the sidebar state
import { createContext, useContext } from 'react';

// Create a context for the sidebar state
export const SidebarContext = createContext({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
  toggleCollapsed: () => {},
  isHovering: false,
  setIsHovering: (isHovering: boolean) => {},
  keepExpanded: true,
  setKeepExpanded: (keepExpanded: boolean) => {},
});

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

interface NavigationLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  className?: string;
}

const NavigationLink = ({ 
  href, 
  icon, 
  label, 
  isActive, 
  className = ""
}: NavigationLinkProps) => {
  
  return (
    <li className="relative group">
      {/* Active indicator */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r transition-all duration-300 ${
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        }`}
      ></div>
      
      <Link 
        href={href} 
        className={`flex items-center p-3 pl-3 
          text-base font-normal rounded-lg transition-all duration-300 ease-in-out
          ${isActive 
            ? 'bg-blue-50 text-blue-600 font-medium'
            : 'text-gray-700 hover:bg-gray-100'
          } ${className} group-hover:translate-x-1`}
        title={label}
      >
        <div className="flex items-center justify-center min-w-[24px] transition-all duration-300">
          {icon}
        </div>
        
        <div className="ml-3 whitespace-nowrap overflow-hidden transition-all duration-300 w-auto opacity-100">
          {label}
        </div>
      </Link>
    </li>
  );
};

// Section divider component
const SectionDivider = ({ 
  label
}: { 
  label: string
}) => {
  return (
    <div className="mt-6 mb-2">
      <div className="flex items-center px-3">
        <div className="h-px bg-gray-200 flex-grow"></div>
        <span className="px-2 text-xs font-medium text-gray-500 uppercase">
          {label}
        </span>
        <div className="h-px bg-gray-200 flex-grow"></div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  
  // Function to check if a path is active or if we're on a subpage of that path
  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <aside className="fixed h-screen bg-white border-r border-gray-200 pt-16 transition-all duration-300 ease-in-out z-20 shadow-md w-64">
      <div className="overflow-y-auto px-3 py-6 h-full flex flex-col">
        {/* Main navigation section */}
        <div className="flex-grow">
          <ul className="space-y-1.5 mt-2">
            <NavigationLink
              href="/dashboard"
              icon={<Home className={`transition duration-200 ${
                isActivePath('/dashboard') ? 'text-blue-600' : 'text-gray-500'
              }`} />}
              label="Dashboard"
              isActive={isActivePath('/dashboard')}
            />
            <NavigationLink
              href="/exit-interviews"
              icon={<FileText className={`transition duration-200 ${
                isActivePath('/exit-interviews') ? 'text-blue-600' : 'text-gray-500'
              }`} />}
              label="Exit Interviews"
              isActive={isActivePath('/exit-interviews')}
            />
            <NavigationLink
              href="/reports"
              icon={<BarChart2 className={`transition duration-200 ${
                isActivePath('/reports') ? 'text-blue-600' : 'text-gray-500'
              }`} />}
              label="Reports"
              isActive={isActivePath('/reports')}
            />
          </ul>
        </div>
        
        {/* Administration section at the bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center px-3 mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase">
              Administration
            </span>
          </div>
          <ul className="space-y-1.5">
            <NavigationLink
              href="/admin"
              icon={<Users className={`transition duration-200 ${
                isActivePath('/admin') && pathname !== '/admin/settings' ? 'text-blue-600' : 'text-gray-500'
              }`} />}
              label="Admin"
              isActive={isActivePath('/admin') && pathname !== '/admin/settings'}
            />
            <NavigationLink
              href="/admin/settings"
              icon={<Settings className={`transition duration-200 ${
                pathname === '/admin/settings' ? 'text-blue-600' : 'text-gray-500'
              }`} />}
              label="Settings"
              isActive={pathname === '/admin/settings'}
            />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;