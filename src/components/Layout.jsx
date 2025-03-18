import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden">
            <Sidebar setMenuOpen={setMenuOpen} isMobile={true} />
          </div>
        )}
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 pr-6">
          <Sidebar setMenuOpen={setMenuOpen} isMobile={false} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          
          <div className="px-4 py-6">
            <div className="flex flex-col md:flex-row">
              {/* Content Area */}
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
