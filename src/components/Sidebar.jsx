
import React, { useState, useEffect } from 'react';
import { LuLogOut } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/nf-logo.jpg';
import { FaHome } from 'react-icons/fa';
import { GiPlantRoots, GiWateringCan } from 'react-icons/gi'; 
import { WiDaySunny } from 'react-icons/wi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { GiFarmTractor } from 'react-icons/gi';
import { MdTerrain } from 'react-icons/md';
import { FaUsers, FaLeaf, FaMapMarkedAlt } from "react-icons/fa";
import { MdAssessment, MdNotifications } from "react-icons/md";
import { AiOutlineForm } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [userRole, setUserRole] = useState('');
  const location = useLocation();  // Get the current location
  const navigate = useNavigate();  

  useEffect(() => {
    // Get the user role from localStorage
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  const ADMIN_SIDEBAR_LINKS = [
   
    { id: 1, path: '/admin/ServiceProviderDashboard', name: 'Dashboard', icon: FaHome },
    { id: 2, path: '/admin/ServicesManagement', name: 'Services', icon: GiWateringCan },
    { id: 3, path: '/admin/ServiceReport', name: 'Analytics', icon: MdAssessment },
    { id: 4, path: '/admin/FarmEquipmentManager', name: 'Equipment Management', icon: FaMapMarkedAlt },
    { id: 5, path: '/admin/StaffAssignmentForm', name: 'Staff Assignment', icon: FaUsers },
  ];

  const USER_SIDEBAR_LINKS = [
    { id: 1, path: '/user', name: 'Dashboard', icon: FaHome },
    { id: 2, path: '/user/CropMonitoring', name: 'Crop Monitoring', icon: GiPlantRoots },
    { id: 3, path: '/user/SoilHealth', name: 'Soil Health', icon: MdTerrain },
    { id: 4, path: '/user/IrrigationControl', name: 'Irrigation Control', icon: GiWateringCan },
    { id: 10, path: '/user/pest', name: 'Pest Control', icon: GiWateringCan },
    { id: 6, path: '/user/FarmEquipment', name: 'Farm Equipment', icon: GiFarmTractor },
    { id: 9, path: '/user/crop', name: 'Crop Recommendation', icon: AiOutlineForm },
    { id: 7, path: '/user/AnalyticsAndReports', name: 'Analytics & Reports', icon: AiOutlineBarChart },
    { id: 8, path: '/user/Service', name: 'Service Request', icon: AiOutlineForm },
  ];

  const MAIN_SIDEBAR_LINKS = [
    { id: 1, path: '/main', name: 'Dashboard', icon: FaHome },
    { id: 2, path: '/main/FarmerManagement', name: 'Farmer Management', icon: GiPlantRoots },
    { id: 3, path: '/main/TaskManagement', name: 'Task Management', icon: MdTerrain },
    { id: 4, path: '/main/ReportsAnalytics', name: 'Reports & Analytics', icon: GiWateringCan },
    
  ];

  const SIDEBAR_LINKS = 
  userRole === 'admin' ? ADMIN_SIDEBAR_LINKS : 
  userRole === 'main' ? MAIN_SIDEBAR_LINKS : 
  USER_SIDEBAR_LINKS;


  const handleLogout = () => {
    localStorage.removeItem('role');  // Clear the session data
    navigate('/');  // Navigate to the sign-in page
  };

  return (
    <div className="w-16 md:w-64 fixed left-0 top-0 z-10 h-screen pt-8 px-4 bg-[#286243] text-white">
      <div className="px-5 flex items-center">
        <img src={logo} className="w-9 flex rounded-[50%]" />
        <h1 className="text-xl font-semibold ml-3 hidden md:flex">Neural Farms</h1>
      </div>
      <ul className="mt-14 space-y-4">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md px-5 hover:bg-white hover:text-[#286243] ${location.pathname === link.path ? 'bg-[#c1d9b7] text-[#31694a]' : ''}`}
          >
            <Link
              to={link.path}
              className="flex items-center md:space-x-5 justify-center md:justify-start py-3"
            >
              <span>{link.icon()}</span>
              <span className={`text-md ${location.pathname === link.path ? ' text-[#31694a]' : ''} hidden md:flex`}>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-5 cursor-pointer text-center py-2 px-5">
        <p className="flex items-center space-x-6 ps-7 text-md hover:bg-gray-100 hover:text-[#31694a] py-2 rounded-md justify-center md:justify-start" onClick={handleLogout}>
          <LuLogOut className="flex" />
          <span className="hidden md:flex pe-20 font-semibold">Logout</span>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
