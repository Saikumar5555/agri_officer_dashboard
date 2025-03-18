import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown, Tractor } from 'lucide-react';

const Header = ({ menuOpen, setMenuOpen }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Sample notifications data
  const notifications = [
    { id: 1, message: 'New subsidy applications received', time: '2 hours ago', read: false },
    { id: 2, message: 'Weather alert: Heavy rainfall expected', time: '5 hours ago', read: false },
    { id: 3, message: 'Monthly report due in 3 days', time: '1 day ago', read: true },
    { id: 4, message: '15 farmers completed compliance requirements', time: '2 days ago', read: true }
  ];

  return (
    <nav className="bg-[#057a55] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center space-x-2">
              <div className="h-8 w-8 bg-green-600 rounded-md flex items-center justify-center">
                <Tractor size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">AgriMonitor</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-3 py-2 border rounded-lg w-64"
              />
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full text-white hover:text-gray-800 hover:bg-gray-100 focus:outline-none relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                  <h3 className="px-4 py-2 font-medium text-white border-b">Notifications</h3>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">AO</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-white">Amit Kumar</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>
              
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                  <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <div className="border-t border-gray-100"></div>
                  <a href="#signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;