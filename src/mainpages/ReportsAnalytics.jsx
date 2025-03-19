import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BarChart2, FileText } from 'lucide-react';

const ReportsAnalytics = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
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
  
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report generated successfully!');
    setIsReportModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md m-5">
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
    </>
  );
};

export default ReportsAnalytics;