import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Users, Calendar, FileCheck, Plus, FileText, Tractor } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, setMenuOpen, isMobile }) => {
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <div className={`bg-[#057a55] ${isMobile ? 'h-full w-64 p-4' : 'h-screen w-64 p-4'}`}>
      {/* User profile for non-mobile view */}
      {!isMobile && (
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="mb-6 text-center">
            <div className="h-16 w-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-2xl text-white font-medium">AK</span>
            </div>
            <h2 className="mt-2 text-lg font-medium text-gray-800">Amit Kumar</h2>
            <p className="text-sm text-gray-600">Agriculture Officer</p>
            <p className="text-xs text-gray-500">North Regional Office</p>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className={`${isMobile ? 'space-y-1' : 'bg-white p-4 rounded-xl shadow-sm mb-6 space-y-1'}`}>
        <Link
          to="/dashboard"
          onClick={() => handleTabChange('dashboard')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-500'}`}
        >
          <Database size={20} className="mr-3" />
          Dashboard
        </Link>

        <Link
          to="/farmers"
          onClick={() => handleTabChange('farmers')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'farmers' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-500'}`}
        >
          <Users size={20} className="mr-3" />
          Farmer Management
        </Link>

        <Link
          to="/tasks"
          onClick={() => handleTabChange('tasks')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'tasks' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-500'}`}
        >
          <Calendar size={20} className="mr-3" />
          Task Management
        </Link>

        <Link
          to="/reports"
          onClick={() => handleTabChange('reports')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'reports' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-green-500'}`}
        >
          <FileCheck size={20} className="mr-3" />
          Reports & Analytics
        </Link>
      </nav>

      {/* Quick Actions for non-mobile view */}
      {!isMobile && (
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
              <Plus size={16} className="mr-2" />
              Add New Farmer
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
              <Calendar size={16} className="mr-2" />
              Schedule Field Visit
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
              <FileText size={16} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;