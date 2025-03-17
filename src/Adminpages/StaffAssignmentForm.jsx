import React, { useState } from 'react';
import { Users, MapPin, UserPlus, Calendar, Search, Briefcase, X, CheckCircle, User } from 'lucide-react';

const StaffAssignmentForm = () => {
  // Sample staff data (in a real app, this would come from an API)
  const [staffMembers, setStaffMembers] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      role: "Equipment Operator", 
      currentLocation: "Green Valley Farm", 
      status: "Assigned", 
      returnTime: "4:30 PM" 
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      role: "Field Supervisor", 
      currentLocation: "Golden Fields", 
      status: "Assigned", 
      returnTime: "5:15 PM" 
    },
    { 
      id: 3, 
      name: "Robert Johnson", 
      role: "Maintenance Technician", 
      currentLocation: "Central Warehouse", 
      status: "Available", 
      returnTime: null 
    },
    { 
      id: 4, 
      name: "Sarah Williams", 
      role: "Agricultural Consultant", 
      currentLocation: "Sunrise Orchards", 
      status: "Assigned", 
      returnTime: "3:00 PM" 
    },
    { 
      id: 5, 
      name: "David Lee", 
      role: "Harvester Operator", 
      currentLocation: "Main Office", 
      status: "Available", 
      returnTime: null 
    },
    { 
      id: 6, 
      name: "Jennifer Brown", 
      role: "Transportation Specialist", 
      currentLocation: "Blue River Ranch", 
      status: "Assigned", 
      returnTime: "6:00 PM" 
    }
  ]);

  // New staff onboarding form state
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  const [onboardingSuccess, setOnboardingSuccess] = useState(false);
  
  // Search/filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Handle onboarding form submission
  const handleOnboardStaff = (e) => {
    e.preventDefault();
    
    if (newStaffName && newStaffRole) {
      const newStaffMember = {
        id: staffMembers.length + 1,
        name: newStaffName,
        role: newStaffRole,
        currentLocation: "Main Office",
        status: "Available",
        returnTime: null
      };
      
      setStaffMembers([...staffMembers, newStaffMember]);
      setNewStaffName('');
      setNewStaffRole('');
      setOnboardingSuccess(true);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setOnboardingSuccess(false);
        setShowOnboardingForm(false);
      }, 3000);
    }
  };

  // Filter staff members based on search term and status filter
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'assigned' && staff.status === 'Assigned') ||
                          (filterStatus === 'available' && staff.status === 'Available');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full ">
      {/* Header with total staff count */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Users className="mr-2 text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Staff Dashboard</h2>
          <div className="ml-4 bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
            Total Staff: {staffMembers.length}
          </div>
        </div>
        
        <button 
          onClick={() => setShowOnboardingForm(!showOnboardingForm)}
          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
        >
          <UserPlus className="mr-1" size={16} />
          {showOnboardingForm ? "Cancel" : "Onboard New Staff"}
        </button>
      </div>
      
      {/* Quick onboarding form */}
      {showOnboardingForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700 flex items-center">
              <UserPlus className="mr-2 text-green-600" size={18} />
              Quick Staff Onboarding
            </h3>
            <button 
              onClick={() => setShowOnboardingForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>
          
          {onboardingSuccess ? (
            <div className="bg-green-100 text-green-800 p-3 rounded-lg flex items-center">
              <CheckCircle className="mr-2" size={18} />
              Staff member successfully onboarded!
            </div>
          ) : (
            <form onSubmit={handleOnboardStaff} className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Staff Name"
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg min-w-0"
                required
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg min-w-0"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add
              </button>
            </form>
          )}
        </div>
      )}
      
      {/* Search and filter controls */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search staff, roles, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-2 ${filterStatus === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('assigned')}
            className={`px-3 py-2 ${filterStatus === 'assigned' ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-600'}`}
          >
            Assigned
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`px-3 py-2 ${filterStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600'}`}
          >
            Available
          </button>
        </div>
      </div>
      
      {/* Staff listing */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Location</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Return</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                      <User size={16} />
                    </div>
                    <span className="font-medium text-gray-900">{staff.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Briefcase className="mr-2 text-gray-400" size={14} />
                    <span className="text-gray-500">{staff.role}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-gray-400" size={14} />
                    <span className="text-gray-500">{staff.currentLocation}</span>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${staff.status === 'Assigned' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'}`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {staff.returnTime ? (
                    <div className="flex items-center text-gray-500">
                      <Calendar className="mr-2 text-gray-400" size={14} />
                      <span>Today, {staff.returnTime}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredStaff.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No staff members match your search criteria.
          </div>
        )}
      </div>
      
      {/* Summary stats at bottom */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-blue-800 font-medium">Total Staff</div>
          <div className="text-2xl font-bold">{staffMembers.length}</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-yellow-800 font-medium">Currently Assigned</div>
          <div className="text-2xl font-bold">
            {staffMembers.filter(s => s.status === 'Assigned').length}
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-green-800 font-medium">Available Staff</div>
          <div className="text-2xl font-bold">
            {staffMembers.filter(s => s.status === 'Available').length}
          </div>
        </div>
      </div>
    </div>
  );
};


export default StaffAssignmentForm;