import React from 'react';
import { Search, UserCircle, Plus } from 'lucide-react';

const FarmerManagement = () => {
  // Sample farmers data
  const farmers = [
    { id: 1, name: 'Rajesh Kumar', village: 'Greenfield', district: 'North', crops: 'Rice, Wheat', area: 12.5, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-10' },
    { id: 2, name: 'Meena Patel', village: 'Riverside', district: 'South', crops: 'Maize, Vegetables', area: 8.2, compliance: 'Pending', status: 'active', lastVisit: '2025-02-28' },
    { id: 3, name: 'Sunil Sharma', village: 'Hillview', district: 'East', crops: 'Pulses, Rice', area: 15.0, compliance: 'Non-compliant', status: 'warning', lastVisit: '2025-03-15' },
    { id: 4, name: 'Anita Singh', village: 'Meadowland', district: 'West', crops: 'Wheat, Vegetables', area: 6.8, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-05' },
    { id: 5, name: 'Vijay Deshmukh', village: 'Sunnydale', district: 'North', crops: 'Rice, Pulses', area: 10.5, compliance: 'Compliant', status: 'active', lastVisit: '2025-03-12' }
  ];
  
  const getComplianceColor = (status) => {
    switch(status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Non-compliant': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white m-5 p-5 rounded-xl shadow-md">
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
};

export default FarmerManagement;