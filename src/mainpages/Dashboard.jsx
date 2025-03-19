import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { MapPin, Users, Tractor, ShieldCheck, CloudRain, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [districtFilter, setDistrictFilter] = useState('all');
  const [cropFilter, setCropFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  
  // Sample data
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
    { id: 3, name: 'Sunil Sharma', village: 'Hillview', district: 'East', crops: 'Pulses, Rice', area: 15.0, compliance: 'Non-compliant', status: 'warning', lastVisit: '2025-03-15' }
  ];
  
  const subsidies = [
    { id: 1, name: 'Fertilizer Subsidy', farmers: 850, amount: 425000, status: 'Disbursed' },
    { id: 2, name: 'Seed Subsidy', farmers: 720, amount: 360000, status: 'Processing' },
    { id: 3, name: 'Equipment Grant', farmers: 320, amount: 960000, status: 'Approved' },
    { id: 4, name: 'Irrigation Support', farmers: 540, amount: 810000, status: 'Disbursed' }
  ];
  
  const tasks = [
    { id: 1, title: 'Field Inspection - Riverside Village', date: '2025-03-20', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Training Program - Organic Farming', date: '2025-03-25', priority: 'Medium', status: 'Scheduled' }
  ];
  
  const alerts = [
    { id: 1, title: 'Potential Pest Outbreak', location: 'South District', severity: 'High', date: '2025-03-17' },
    { id: 2, title: 'Rainfall Shortage', location: 'East District', severity: 'Medium', date: '2025-03-16' },
    { id: 3, title: 'Subsidy Application Deadline', location: 'All Districts', severity: 'Medium', date: '2025-03-18' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
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
};

export default Dashboard;