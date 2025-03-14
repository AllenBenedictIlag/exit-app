'use client';

import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar, { useSidebar, SidebarContext } from './Sidebar';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Default to collapsed on desktop for a cleaner look
  const [collapsed, setCollapsed] = React.useState(true);
  const [isHovering, setIsHovering] = React.useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Check viewport size on mount and when resized
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Always collapse on small screens
      if (mobile && !collapsed) {
        setCollapsed(true);
      }
    };
    
    // Check on initial render
    checkScreenSize();
    
    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [collapsed]);
  
  // Check localStorage for saved preference on first render, but only use it if it's explicitly set
  // This allows our default collapsed state to take precedence when no preference is set
  React.useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebarCollapsed');
    if (savedCollapsed !== null) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);
  
  // Save preference to localStorage when explicitly changed
  React.useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);
  
  // Toggle collapsed state (used only for mobile now)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Toggle sidebar visibility on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Handle hover state changes which will auto-expand the sidebar
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  return (
    <SidebarContext.Provider value={{ 
      collapsed, 
      setCollapsed, 
      toggleCollapsed,
      isHovering,
      setIsHovering
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
        
        {/* Conditional rendering for mobile */}
        <div 
          className={`${isMobile && !sidebarOpen ? 'hidden' : 'block'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Sidebar />
        </div>
        
        <div className={`transition-all duration-300 ease-in-out pt-16 ${
          isMobile 
            ? (sidebarOpen ? 'pl-[60px] lg:pl-[60px]' : 'pl-0') 
            : (collapsed && !isHovering ? 'pl-[60px]' : 'pl-64')
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