'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, BarChart2, Settings, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

// Create a context to share the sidebar state
import { createContext, useContext } from 'react';

// Create a context for the sidebar state
export const SidebarContext = createContext({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => {},
  toggleCollapsed: () => {},
  isHovering: false,
  setIsHovering: (isHovering: boolean) => {},
});

// Custom hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

interface NavigationLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
  isHovering: boolean;
  className?: string;
}

const NavigationLink = ({ 
  href, 
  icon, 
  label, 
  isActive, 
  collapsed,
  isHovering,
  className = "" 
}: NavigationLinkProps) => {
  return (
    <li className="relative group">
      {/* Active indicator - hide when sidebar is collapsed and not hovering */}
      <div 
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r transition-all duration-300 ${
          isActive ? (collapsed && !isHovering ? 'opacity-0' : 'opacity-100') : 'opacity-0 group-hover:opacity-50'
        }`}
      ></div>
      
      <Link 
        href={href} 
        className={`flex items-center ${collapsed && !isHovering ? 'justify-center py-2.5 px-0' : 'p-2 pl-3'} 
          text-base font-normal rounded-lg transition-all duration-300 ease-in-out
          ${isActive 
            ? (collapsed && !isHovering ? 'text-blue-600' : 'bg-blue-50 text-blue-600 font-medium')
            : 'text-gray-700 hover:bg-gray-100'
          } ${className} ${collapsed && !isHovering ? '' : 'group-hover:translate-x-1'}`}
        title={collapsed && !isHovering ? label : ''}
      >
        <div className={`flex items-center justify-center ${collapsed && !isHovering ? 'w-full mx-auto' : 'min-w-[24px]'} transition-all duration-300`}>
          {icon}
        </div>
        
        <span 
          className={`ml-3 whitespace-nowrap transition-all duration-300 ${
            collapsed && !isHovering ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed, toggleCollapsed, isHovering, setIsHovering } = useSidebar();
  
  // Function to check if a path is active or if we're on a subpage of that path
  const isActivePath = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Navigation items configuration
  const navigationItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: <Home className={`transition duration-200 ${
        isActivePath('/dashboard') ? 'text-blue-600' : 'text-gray-500'
      }`} />,
      isActive: isActivePath('/dashboard'),
    },
    {
      href: '/exit-interviews',
      label: 'Exit Interviews',
      icon: <FileText className={`transition duration-200 ${
        isActivePath('/exit-interviews') ? 'text-blue-600' : 'text-gray-500'
      }`} />,
      isActive: isActivePath('/exit-interviews'),
    },
    {
      href: '/reports',
      label: 'Reports',
      icon: <BarChart2 className={`transition duration-200 ${
        isActivePath('/reports') ? 'text-blue-600' : 'text-gray-500'
      }`} />,
      isActive: isActivePath('/reports'),
    },
    {
      href: '/admin',
      label: 'Admin',
      icon: <Users className={`transition duration-200 ${
        isActivePath('/admin') && pathname !== '/admin/settings' ? 'text-blue-600' : 'text-gray-500'
      }`} />,
      isActive: isActivePath('/admin') && pathname !== '/admin/settings',
    },
  ];

  return (
    <aside 
      className={`fixed h-screen bg-white border-r border-gray-200 pt-16 transition-all duration-300 ease-in-out z-20 shadow-md ${
        collapsed && !isHovering ? 'w-[60px]' : 'w-64'
      }`}
    >
      <div className={`overflow-y-auto ${collapsed && !isHovering ? 'px-0' : 'px-3'} py-6 h-full relative`}>
        
        <ul className={`space-y-1.5 ${collapsed && !isHovering ? 'px-0' : ''} mt-2`}>
          {navigationItems.map((item) => (
            <NavigationLink
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={item.isActive}
              collapsed={collapsed}
              isHovering={isHovering}
            />
          ))}
          
          <li className="border-t border-gray-200 my-4"></li>
          
          <NavigationLink
            href="/admin/settings"
            icon={<Settings className={`transition duration-200 ${
              pathname === '/admin/settings' ? 'text-blue-600' : 'text-gray-500'
            }`} />}
            label="Settings"
            isActive={pathname === '/admin/settings'}
            collapsed={collapsed}
            isHovering={isHovering}
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;