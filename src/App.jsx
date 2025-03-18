// import React, { useState } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/pages/Dashboard';
// import FarmerManagement from './components/pages/FarmerManagement';
// import TaskManagement from './components/pages/TaskManagement';
// import ReportsAnalytics from './components/pages/ReportsAnalytics';
// // import './App.css';

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [menuOpen, setMenuOpen] = useState(false);
  
//   // Function to render the active page content
//   const renderPageContent = () => {
//     switch(activeTab) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'farmers':
//         return <FarmerManagement />;
//       case 'tasks':
//         return <TaskManagement />;
//       case 'reports':
//         return <ReportsAnalytics />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header 
//         menuOpen={menuOpen} 
//         setMenuOpen={setMenuOpen} 
//       />
      
//       <div className=" px-4 py-6">
//         <div className="flex flex-col md:flex-row">
//           {/* Mobile Sidebar Toggle */}
//           {menuOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden">
//               <Sidebar 
//                 activeTab={activeTab} 
//                 setActiveTab={setActiveTab} 
//                 setMenuOpen={setMenuOpen} 
//                 isMobile={true}
//               />
//             </div>
//           )}
          
//           {/* Desktop Sidebar */}
//           <div className="hidden md:block w-64 pr-6">
//             <Sidebar 
//               activeTab={activeTab} 
//               setActiveTab={setActiveTab} 
//               setMenuOpen={setMenuOpen} 
//               isMobile={false}
//             />
//           </div>
          
//           {/* Main Content */}
//           <div className="flex-1 overflow-hidden">
//             {/* Header with Breadcrumbs */}
//             <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800">
//                   {activeTab === 'dashboard' && 'Agriculture Dashboard'}
//                   {activeTab === 'farmers' && 'Farmer Management'}
//                   {activeTab === 'tasks' && 'Task Management'}
//                   {activeTab === 'reports' && 'Reports & Analytics'}
//                 </h1>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <span>Home</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
//                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
//                        className="mx-1">
//                     <path d="M5 12h14M12 5l7 7-7 7"></path>
//                   </svg>
//                   <span className="capitalize">{activeTab}</span>
//                 </div>
//               </div>
              
//               <div className="mt-4 md:mt-0">
//                 <span className="text-sm text-gray-500">Last updated: March 18, 2025, 10:45 AM</span>
//               </div>
//             </div>
            
//             {/* Content Area */}
//             {renderPageContent()}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import FarmerManagement from './components/pages/FarmerManagement';
import TaskManagement from './components/pages/TaskManagement';
import ReportsAnalytics from './components/pages/ReportsAnalytics';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="farmers" element={<FarmerManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="reports" element={<ReportsAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

