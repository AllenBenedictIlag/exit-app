'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar, { useSidebar, SidebarContext } from './Sidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Default to not collapsed since we're keeping the sidebar expanded permanently
  const [collapsed, setCollapsed] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previousPath, setPreviousPath] = useState('');
  
  // Track path changes to manage sidebar state during navigation
  useEffect(() => {
    // Store the current expanded state in session storage when navigating
    if (previousPath && previousPath !== pathname) {
      if (!collapsed || isHovering) {
        // Don't collapse the sidebar when navigating between pages
        setCollapsed(false);
      }
    }
    
    // Update previous path
    setPreviousPath(pathname);
  }, [pathname, collapsed, isHovering]);
  
  // Check viewport size on mount and when resized
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    // Check on initial render
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle hover state changes
  const handleMouseEnter = () => {
    setIsHovering(true);
    // When user hovers over the sidebar, keep it expanded
    setCollapsed(false);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    
    // Check if we're in Admin section - we'll keep behavior consistent for all sections
    // We'll only auto-collapse if we're not actively navigating
    if (previousPath === pathname) {
      setCollapsed(true);
    }
  };
  
  // Determine if sidebar should be expanded
  const shouldExpandSidebar = isHovering || !collapsed;
  
  return (
    <SidebarContext.Provider value={{ 
      collapsed: false, 
      setCollapsed: () => {}, 
      toggleCollapsed: () => {},
      isHovering: false,
      setIsHovering: () => {},
      keepExpanded: true,
      setKeepExpanded: () => {}
    }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar>
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="p-2 mr-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}
        </Navbar>
        
        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar container - always visible on desktop */}
        <div className={`sidebar-container ${isMobile && !sidebarOpen ? 'hidden' : 'block'}`}>
          <Sidebar />
        </div>
        
        <div className={`transition-all duration-300 ease-in-out pt-16 ${
          isMobile 
            ? (sidebarOpen ? 'pl-[60px] lg:pl-64' : 'pl-0') 
            : 'pl-64'
        }`}>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default DashboardLayout;