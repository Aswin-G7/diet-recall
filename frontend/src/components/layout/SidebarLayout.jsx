import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen w-full relative">
      {/* The Sidebar component handles its own fixed positioning */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 w-full min-h-screen transition-all duration-300">
        {/* p-4 md:p-8: Standard padding
           pt-24 md:pt-8: Extra top padding on mobile so content isn't hidden behind the hamburger 
        */}
        <div className="p-4 md:p-8 pt-10 md:pt-4 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarLayout;