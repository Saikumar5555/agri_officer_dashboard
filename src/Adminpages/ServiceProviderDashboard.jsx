import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, MapPin, CloudRain, Tractor, FileText, Calendar, ChevronDown, AlertCircle, FileCheck, Search, Bell, UserCircle, Settings, Menu, ShieldCheck, Copy, Database, ArrowRight, Filter, BarChart2, Plus } from 'lucide-react';

const AgricultureOfficerDashboard = () => {
  // State for active tab and other UI states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [districtFilter, setDistrictFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // Sample data for the dashboard
  const cropData = [
    { name: 'Rice', area: 12500, production: 34500, farmers: 1250, color: '#8884d8' },
    { name: 'Wheat', area: 8500, production: 21500, farmers: 850, color: '#83a6ed' },
    { name: 'Maize', area: 5600, production: 14800, farmers: 630, color: '#8dd1e1' },
    { name: 'Pulses', area: 4200, production: 9200, farmers: 480, color: '#82ca9d' },
    { name: 'Vegetables', area: 3100, production: 18500, farmers: 560, color: '#a4de6c' }
  ];
  
  const monthlyData = [
    { month: 'Jan', rainfall: 45, temperature: 12, soilHealth: 82, pests: 5 },
    { month: 'Feb', rainfall: 38, temperature: 15, soilHealth: 80, pests: 8 },
    { month: 'Mar', rainfall: 52, temperature: 18, soilHealth: 85, pests: 12 },
    { month: 'Apr', rainfall: 70, temperature: 22, soilHealth: 83, pests: 15 },
    { month: 'May', rainfall: 95, temperature: 26, soilHealth: 79, pests: 18 },
    { month: 'Jun', rainfall: 130, temperature: 28, soilHealth: 78, pests: 10 }
  ];
  
  const farmers = [
    { id: 1, name: 'Rajesh Kumar', village: 'Greenfield', district: 'North', crops: 'Rice, Wheat', area: 12.5, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-10' },
    { id: 2, name: 'Meena Patel', village: 'Riverside', district: 'South', crops: 'Maize, Vegetables', area: 8.2, compliance: 'Pending', status: 'active', lastVisit: '2025-02-28' },
    { id: 3, name: 'Sunil Sharma', village: 'Hillview', district: 'East', crops: 'Pulses, Rice', area: 15.0, compliance: 'Non-compliant', status: 'warning', lastVisit: '2025-03-15' },
    { id: 4, name: 'Anita Singh', village: 'Meadowland', district: 'West', crops: 'Wheat, Vegetables', area: 6.8, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-05' },
    { id: 5, name: 'Vijay Deshmukh', village: 'Sunnydale', district: 'North', crops: 'Rice, Pulses', area: 10.5, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-12' }
  ];
  
  const subsidies = [
    { id: 1, name: 'Fertilizer Subsidy', farmers: 850, amount: 425000, status: 'Disbursed' },
    { id: 2, name: 'Seed Subsidy', farmers: 720, amount: 360000, status: 'Processing' },
    { id: 3, name: 'Equipment Grant', farmers: 320, amount: 960000, status: 'Approved' },
    { id: 4, name: 'Irrigation Support', farmers: 540, amount: 810000, status: 'Disbursed' }
  ];
  
  const tasks = [
    { id: 1, title: 'Field Inspection - Riverside Village', date: '2025-03-20', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Training Program - Organic Farming', date: '2025-03-25', priority: 'Medium', status: 'Scheduled' },
    { id: 3, title: 'Subsidy Verification - East District', date: '2025-03-18', priority: 'High', status: 'Completed' },
    { id: 4, title: 'Crop Assessment - Wheat Fields', date: '2025-03-22', priority: 'Medium', status: 'Pending' },
    { id: 5, title: 'Farmer Meeting - Pest Control', date: '2025-03-19', priority: 'Low', status: 'Scheduled' }
  ];
  
  const alerts = [
    { id: 1, title: 'Potential Pest Outbreak', location: 'South District', severity: 'High', date: '2025-03-17' },
    { id: 2, title: 'Rainfall Shortage', location: 'East District', severity: 'Medium', date: '2025-03-16' },
    { id: 3, title: 'Subsidy Application Deadline', location: 'All Districts', severity: 'Medium', date: '2025-03-18' }
  ];
  
  const notifications = [
    { id: 1, message: 'New subsidy applications received', time: '2 hours ago', read: false },
    { id: 2, message: 'Weather alert: Heavy rainfall expected', time: '5 hours ago', read: false },
    { id: 3, message: 'Monthly report due in 3 days', time: '1 day ago', read: true },
    { id: 4, message: '15 farmers completed compliance requirements', time: '2 days ago', read: true }
  ];
  
  // Handler functions
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    alert('Task created successfully!');
    setIsTaskModalOpen(false);
  };
  
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report generated successfully!');
    setIsReportModalOpen(false);
  };
  
  const getComplianceColor = (status) => {
    switch(status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Non-compliant': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Cards Row */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <MapPin size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Land Area</p>
                  <p className="text-xl font-bold text-gray-800">33,900 Hectares</p>
                  <p className="text-xs text-green-600">+5.2% from last month</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <Users size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registered Farmers</p>
                  <p className="text-xl font-bold text-gray-800">3,770</p>
                  <p className="text-xs text-green-600">+120 new registrations</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <Tractor size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Production</p>
                  <p className="text-xl font-bold text-gray-800">98,500 Tonnes</p>
                  <p className="text-xs text-green-600">+8.3% from last season</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
                <div className="rounded-full bg-orange-100 p-3 mr-4">
                  <ShieldCheck size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Compliance Rate</p>
                  <p className="text-xl font-bold text-gray-800">82%</p>
                  <p className="text-xs text-green-600">+3.5% improvement</p>
                </div>
              </div>
            </div>
            
            {/* Crop Distribution Chart */}
            <div className="bg-white p-4 rounded-xl shadow-md lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Crop Distribution</h2>
                <div className="flex space-x-2">
                  <select 
                    className="text-sm border rounded-md px-2 py-1"
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                  >
                    <option value="all">All Districts</option>
                    <option value="north">North District</option>
                    <option value="south">South District</option>
                    <option value="east">East District</option>
                    <option value="west">West District</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 flex items-center justify-center">
                  <ResponsiveContainer width={180} height={180}>
                    <PieChart>
                      <Pie
                        data={cropData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="area"
                        label
                      >
                        {cropData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="md:col-span-2">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={cropData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="production" name="Production (tonnes)" fill="#8884d8" />
                      <Bar dataKey="farmers" name="Farmers" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2">
                {cropData.map((crop) => (
                  <div key={crop.name} className="bg-gray-50 p-2 rounded-lg text-center">
                    <p className="text-xs text-gray-600">{crop.name}</p>
                    <p className="text-sm font-medium text-gray-800">{crop.area} Ha</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weather & Alerts */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Weather & Alerts</h2>
              
              <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Today's Forecast</p>
                    <div className="flex items-center">
                      <CloudRain size={24} className="text-blue-600 mr-2" />
                      <p className="text-xl font-medium text-gray-800">28°C</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Rainfall chance</p>
                    <p className="text-lg font-medium text-gray-800">60%</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Alerts & Notifications</p>
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-50 p-2 rounded-lg flex items-start">
                      <AlertCircle size={16} className="text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{alert.title}</p>
                        <p className="text-xs text-gray-600">{alert.location} • {alert.severity} priority</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Upcoming Tasks</p>
                <div className="space-y-2">
                  {tasks.filter(task => task.status !== 'Completed').slice(0, 2).map((task) => (
                    <div key={task.id} className="bg-yellow-50 p-2 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">{task.title}</p>
                      <div className="flex justify-between text-xs">
                        <p className="text-gray-600">{task.date}</p>
                        <p className={`font-medium ${task.priority === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>
                          {task.priority} Priority
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Seasonal Trends */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Seasonal Trends</h2>
                <select 
                  className="text-sm border rounded-md px-2 py-1"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="month">Last 6 Months</option>
                  <option value="year">Last Year</option>
                  <option value="5year">5 Year Trend</option>
                </select>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="temperature" name="Temp (°C)" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Avg. Rainfall</p>
                  <p className="text-sm font-medium text-gray-800">71.6 mm</p>
                </div>
                <div className="bg-orange-50 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Avg. Temperature</p>
                  <p className="text-sm font-medium text-gray-800">20.2 °C</p>
                </div>
              </div>
            </div>
            
            {/* Subsidy Distribution */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Subsidy Distribution</h2>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={subsidies}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" name="Amount (₹)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {subsidies.map((subsidy) => (
                  <div key={subsidy.id} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{subsidy.name}</p>
                      <p className="text-xs text-gray-600">{subsidy.farmers} farmers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">₹{subsidy.amount.toLocaleString()}</p>
                      <p className={`text-xs ${subsidy.status === 'Disbursed' ? 'text-green-600' : 'text-orange-600'}`}>
                        {subsidy.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Soil Health Monitoring */}
            <div className="bg-white p-4 rounded-xl shadow-md lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Soil Health Monitoring</h2>
                <select 
                  className="text-sm border rounded-md px-2 py-1"
                  value={cropFilter}
                  onChange={(e) => setCropFilter(e.target.value)}
                >
                  <option value="all">All Crop Types</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="maize">Maize</option>
                  <option value="pulses">Pulses</option>
                </select>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="soilHealth" name="Soil Health Index" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="pests" name="Pest Incidents" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="bg-green-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Nitrogen</p>
                  <p className="text-sm font-medium text-gray-800">Moderate</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Phosphorus</p>
                  <p className="text-sm font-medium text-gray-800">Adequate</p>
                </div>
                <div className="bg-purple-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-600">Potassium</p>
                  <p className="text-sm font-medium text-gray-800">Adequate</p>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg text-center">
                  <p className="text-xs text-gray-600">pH Level</p>
                  <p className="text-sm font-medium text-gray-800">6.8</p>
                </div>
              </div>
            </div>
            
            {/* Compliance Overview */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Compliance Overview</h2>
              
              <div className="flex justify-around mb-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-800 text-xl font-bold">
                    82%
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Compliant</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-800 text-xl font-bold">
                    12%
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-800 text-xl font-bold">
                    6%
                  </div>
                  <p className="mt-1 text-sm text-gray-600">Non-compliant</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <p className="text-sm font-medium text-gray-700">Non-compliant Farmers</p>
                {farmers.filter(farmer => farmer.compliance === 'Non-compliant').map((farmer) => (
                  <div key={farmer.id} className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{farmer.name}</p>
                      <p className="text-xs text-gray-600">{farmer.village}, {farmer.district} District</p>
                    </div>
                    <button className="text-xs px-2 py-1 bg-white border border-red-200 rounded-md text-red-600 hover:bg-red-100">
                      Schedule Visit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'farmers':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <h2 className="text-xl font-semibold text-gray-800">Farmer Management</h2>
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search farmers..."
                    className="pl-9 pr-4 py-2 border rounded-lg w-full md:w-64"
                  />
                  <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                </div>
                <select className="p-2 border rounded-lg">
                  <option value="all">All Districts</option>
                  <option value="north">North District</option>
                  <option value="south">South District</option>
                  <option value="east">East District</option>
                  <option value="west">West District</option>
                </select>
                <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Plus size={16} className="mr-2" />
                  Add Farmer
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area (Ha)</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {farmers.map((farmer) => (
                    <tr key={farmer.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-full flex items-center justify-center">
                            <UserCircle size={24} className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{farmer.name}</div>
                            <div className="text-sm text-gray-500">ID: {farmer.id.toString().padStart(5, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{farmer.village}</div>
                        <div className="text-sm text-gray-500">{farmer.district} District</div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{farmer.crops}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{farmer.area}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getComplianceColor(farmer.compliance)}`}>
                          {farmer.compliance}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-500">{farmer.lastVisit}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-green-600 hover:text-green-900">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1 to 5 of 3,770 results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
                <button className="px-3 py-1 border rounded-md bg-blue-50 text-blue-600 text-sm">1</button>
                <button className="px-3 py-1 border rounded-md text-sm">2</button>
                <button className="px-3 py-1 border rounded-md text-sm">3</button>
                <button className="px-3 py-1 border rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        );
        
      case 'tasks':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Task Management</h2>
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus size={16} className="mr-2" />
                Create Task
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px] bg-yellow-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Pending</h3>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Pending').map((task) => (
                    <div key={task.id} className="bg-white p-3 rounded-lg shadow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.date}</p>
                      <div className="flex justify-between mt-2">
                        <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                          Start
                        </button>
                        <button className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100">
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 min-w-[300px] bg-blue-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Scheduled</h3>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Scheduled').map((task) => (
                    <div key={task.id} className="bg-white p-3 rounded-lg shadow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.date}</p>
                      <div className="flex justify-between mt-2">
                        <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                          Reschedule
                        </button>
                        <button className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100">
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 min-w-[300px] bg-green-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Completed</h3>
                <div className="space-y-3">
                  {tasks.filter(task => task.status === 'Completed').map((task) => (
                    <div key={task.id} className="bg-white p-3 rounded-lg shadow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          Complete
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{task.date}</p>
                      <div className="flex justify-end mt-2">
                        <button className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded hover:bg-gray-100">
                          View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'reports':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Reports & Analytics</h2>
              <button 
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <BarChart2 size={16} className="mr-2" />
                Generate Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Production Reports</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Monthly Production Summary</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 15, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Crop Yield Analysis</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 10, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Farmer Reports</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Farmer Registration Status</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 16, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Compliance Report</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 12, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Administrative Reports</h3>
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Subsidy Disbursement</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 14, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded hover:bg-purple-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">Field Visit Summary</h4>
                    <p className="text-sm text-gray-600 mt-1">Last generated: March 8, 2025</p>
                    <div className="flex justify-end mt-2">
                      <button className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded hover:bg-purple-100">
                        <FileText size={12} className="inline mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-800 mb-3">Crop Distribution by District</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cropData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="area" name="Land Area (Ha)" fill="#8884d8" />
                    <Bar dataKey="farmers" name="Number of Farmers" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-medium text-gray-800 mb-3">Seasonal Production Trends</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="soilHealth" name="Soil Health" stroke="#8884d8" />
                    <Line type="monotone" dataKey="rainfall" name="Rainfall (mm)" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
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
                <span className="text-xl font-bold text-gray-800">AgriMonitor</span>
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
                  className="p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10">
                    <h3 className="px-4 py-2 font-medium text-gray-700 border-b">Notifications</h3>
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
                  <span className="hidden md:block text-sm font-medium text-gray-700">Amit Kumar</span>
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
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation - Mobile Toggle */}
          {menuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden">
              <div className="bg-white h-full w-64 p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-green-600 rounded-md flex items-center justify-center">
                      <Tractor size={20} className="text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-800">AgriMonitor</span>
                  </div>
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    &times;
                  </button>
                </div>
                
                <nav className="space-y-1">
                  <button 
                    onClick={() => {setActiveTab('dashboard'); setMenuOpen(false);}}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Database size={20} className="mr-3" />
                    Dashboard
                  </button>
                  <button 
                    onClick={() => {setActiveTab('farmers'); setMenuOpen(false);}}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'farmers' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Users size={20} className="mr-3" />
                    Farmer Management
                  </button>
                  <button 
                    onClick={() => {setActiveTab('tasks'); setMenuOpen(false);}}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'tasks' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Calendar size={20} className="mr-3" />
                    Task Management
                  </button>
                  <button 
                    onClick={() => {setActiveTab('reports'); setMenuOpen(false);}}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'reports' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FileCheck size={20} className="mr-3" />
                    Reports & Analytics
                  </button>
                </nav>
              </div>
            </div>
          )}
          
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden md:block w-64 pr-6">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
              <div className="mb-6 text-center">
                <div className="h-16 w-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl text-white font-medium">AK</span>
                </div>
                <h2 className="mt-2 text-lg font-medium text-gray-800">Amit Kumar</h2>
                <p className="text-sm text-gray-600">Agriculture Officer</p>
                <p className="text-xs text-gray-500">North Regional Office</p>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'dashboard' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Database size={20} className="mr-3" />
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveTab('farmers')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'farmers' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Users size={20} className="mr-3" />
                  Farmer Management
                </button>
                <button 
                  onClick={() => setActiveTab('tasks')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'tasks' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Calendar size={20} className="mr-3" />
                  Task Management
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${activeTab === 'reports' ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <FileCheck size={20} className="mr-3" />
                  Reports & Analytics
                </button>
              </nav>
            </div>
            
            {/* Quick Actions */}
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
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {/* Header with Breadcrumbs */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeTab === 'dashboard' && 'Agriculture Dashboard'}
                  {activeTab === 'farmers' && 'Farmer Management'}
                  {activeTab === 'tasks' && 'Task Management'}
                  {activeTab === 'reports' && 'Reports & Analytics'}
                </h1>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Home</span>
                  <ArrowRight size={12} className="mx-1" />
                  <span className="capitalize">{activeTab}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <span className="text-sm text-gray-500">Last updated: March 18, 2025, 10:45 AM</span>
              </div>
            </div>
            
            {/* Tab Content */}
            {renderTabContent()}
          </div>
        </div>
      </div>
      
      {/* Task Creation Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Task</h2>
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full p-2 border rounded-lg"
                  rows="3"
                  placeholder="Enter task description"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Task Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Priority</label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Assign To</label>
                <select
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="self">Myself</option>
                  <option value="team">Team Member</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location/District</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="north">North District</option>
                  <option value="south">South District</option>
                  <option value="east">East District</option>
                  <option value="west">West District</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Report Generation Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Generate Report</h2>
            <form onSubmit={handleReportSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Report Type</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="production">Production Report</option>
                  <option value="farmers">Farmer Registration Report</option>
                  <option value="compliance">Compliance Report</option>
                  <option value="subsidy">Subsidy Disbursement Report</option>
                  <option value="visits">Field Visit Report</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Time Period</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">District</label>
                <select
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="all">All Districts</option>
                  <option value="north">North District</option>
                  <option value="south">South District</option>
                  <option value="east">East District</option>
                  <option value="west">West District</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Report Format</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      defaultChecked
                      className="mr-2"
                    />
                    PDF
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      className="mr-2"
                    />
                    Excel
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="csv"
                      className="mr-2"
                    />
                    CSV
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgricultureOfficerDashboard;