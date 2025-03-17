import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceProviderDashboard = () => {
  const [requests, setRequests] = useState([]); // State to hold all requests
  const [filterStatus, setFilterStatus] = useState('all'); // State for filtering by status
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' }); // State for sorting
  const [selectedRequest, setSelectedRequest] = useState(null); // State for viewing details
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // State for detail modal
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // State for assign equipment modal
  const [selectedEquipment, setSelectedEquipment] = useState(''); // State for selected equipment
  const [scheduledDate, setScheduledDate] = useState(''); // State for scheduled date
  const [activeTab, setActiveTab] = useState('requests'); // State for active tab
  const navigate = useNavigate();

  // Hardcoded equipment list with location data
  const equipmentList = [
    {
      id: 1,
      name: "Tractor - John Deere 5045D",
      type: "Tractor",
      model: "John Deere 5045D",
      status: "assigned",
      location: { lat: 26.8467, lng: 80.9462 }, // Lucknow
      assignedTo: "Ankit Sharma",
      assignedDate: "2025-03-24",
      lastMaintenance: "2025-02-15"
    },
    {
      id: 2,
      name: "Harvester - New Holland TC5.30",
      type: "Harvester",
      model: "New Holland TC5.30",
      status: "assigned",
      location: { lat: 25.3176, lng: 82.9739 }, // Varanasi
      assignedTo: "Sunita Patel",
      assignedDate: "2025-03-25",
      lastMaintenance: "2025-03-01"
    },
    {
      id: 3,
      name: "Seed Drill - Mahindra Yuvo",
      type: "Seed Drill",
      model: "Mahindra Yuvo",
      status: "available",
      location: { lat: 26.4499, lng: 80.3319 }, // Kanpur
      assignedTo: null,
      assignedDate: null,
      lastMaintenance: "2025-02-28"
    },
    {
      id: 4,
      name: "Rotavator - Sonalika",
      type: "Rotavator",
      model: "Sonalika",
      status: "maintenance",
      location: { lat: 27.1767, lng: 78.0081 }, // Agra
      assignedTo: null,
      assignedDate: null,
      lastMaintenance: "2025-03-15"
    },
    {
      id: 5,
      name: "Sprayer - HTP 4-Stroke",
      type: "Sprayer",
      model: "HTP 4-Stroke",
      status: "available",
      location: { lat: 28.9845, lng: 77.7064 }, // Meerut
      assignedTo: null,
      assignedDate: null,
      lastMaintenance: "2025-02-20"
    }
  ];

  // Recent updates/activity log
  const recentUpdates = [
    {
      id: 1,
      type: "assignment",
      equipmentName: "Harvester - New Holland TC5.30",
      farmerName: "Sunita Patel",
      timestamp: "2025-03-15 09:32 AM",
      details: "Harvester assigned for rice harvesting"
    },
    {
      id: 2,
      type: "maintenance",
      equipmentName: "Rotavator - Sonalika",
      timestamp: "2025-03-15 11:45 AM",
      details: "Scheduled maintenance - blade replacement and lubrication"
    },
    {
      id: 3,
      type: "completion",
      equipmentName: "Tractor - John Deere 5045D",
      farmerName: "Vijay Yadav",
      timestamp: "2025-03-14 05:18 PM",
      details: "Plowing service completed successfully"
    },
    {
      id: 4,
      type: "request",
      farmerName: "Rajesh Kumar",
      timestamp: "2025-03-14 02:30 PM",
      details: "New service request received for plowing and seeding"
    },
    {
      id: 5,
      type: "movement",
      equipmentName: "Seed Drill - Mahindra Yuvo",
      timestamp: "2025-03-13 08:15 AM",
      details: "Equipment relocated from Kanpur depot to service center"
    }
  ];

  // Hardcoded mock data for farmer requests
  const mockRequests = [
    {
      id: 1,
      name: "Rajesh Kumar",
      MobileNo: "9876543210",
      address: "Village Amritpur, Dist. Lucknow, UP",
      landArea: 5.5,
      services: ["Plowing", "Seeding"],
      crop: "Wheat",
      soilType: "Black soil",
      status: "pending",
      requestDate: "2025-03-10",
      notes: "Requires immediate attention due to upcoming sowing season.",
      previousService: "Yes",
      preferredDate: "2025-03-20",
      location: { lat: 26.8467, lng: 80.8462 } // Near Lucknow
    },
    {
      id: 2,
      name: "Sunita Patel",
      MobileNo: "8765432109",
      address: "Sundarpur, Dist. Varanasi, UP",
      landArea: 3.2,
      services: ["Harvesting"],
      crop: "Rice",
      soilType: "Alluvial soil",
      status: "accepted",
      requestDate: "2025-03-08",
      notes: "Harvesting needed within 2 weeks.",
      previousService: "No",
      scheduledDate: "2025-03-25",
      assignedEquipment: "Harvester - New Holland TC5.30",
      preferredDate: "2025-03-22",
      location: { lat: 25.3176, lng: 82.8739 } // Near Varanasi
    },
    {
      id: 3,
      name: "Mahesh Singh",
      MobileNo: "7654321098",
      address: "Gopalpur, Dist. Kanpur, UP",
      landArea: 7.8,
      services: ["Plowing", "Fertilizing", "Seeding"],
      crop: "Maize",
      soilType: "Red soil",
      status: "rejected",
      requestDate: "2025-03-05",
      notes: "Land too rocky for our equipment.",
      previousService: "Yes",
      preferredDate: "2025-03-15",
      location: { lat: 26.4499, lng: 80.2319 } // Near Kanpur
    },
    {
      id: 4,
      name: "Priya Verma",
      MobileNo: "6543210987",
      address: "Chandpur, Dist. Agra, UP",
      landArea: 4.0,
      services: ["Spraying", "Fertilizing"],
      crop: "Cotton",
      soilType: "Sandy soil",
      status: "pending",
      requestDate: "2025-03-12",
      notes: "Pest infestation reported, requires immediate spraying.",
      previousService: "No",
      preferredDate: "2025-03-18",
      location: { lat: 27.1767, lng: 77.9081 } // Near Agra
    },
    {
      id: 5,
      name: "Ankit Sharma",
      MobileNo: "5432109876",
      address: "Dhanpur, Dist. Meerut, UP",
      landArea: 6.3,
      services: ["Harvesting", "Transportation"],
      crop: "Sugarcane",
      soilType: "Loamy soil",
      status: "accepted",
      requestDate: "2025-03-07",
      notes: "Requires transportation to sugar mill after harvesting.",
      previousService: "Yes",
      scheduledDate: "2025-03-24",
      assignedEquipment: "Tractor - John Deere 5045D",
      preferredDate: "2025-03-24",
      location: { lat: 28.9845, lng: 77.6064 } // Near Meerut
    }
  ];

  // Load data initially (mock data for now)
  useEffect(() => {
    // Using mock data for now
    setRequests(mockRequests);
  }, []);

  // Handle status update for a request
  const updateRequestStatus = async (id, status) => {
    // Using mock update for now
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updatedRequests);
  };

  // Assign equipment and schedule date
  const assignEquipment = (id) => {
    if (!selectedEquipment || !scheduledDate) {
      alert("Please select both equipment and date");
      return;
    }

    const updatedRequests = requests.map((req) =>
      req.id === id ? { 
        ...req, 
        status: 'accepted', 
        assignedEquipment: selectedEquipment,
        scheduledDate: scheduledDate 
      } : req
    );
    
    setRequests(updatedRequests);
    setIsAssignModalOpen(false);
    setSelectedEquipment('');
    setScheduledDate('');
    
    // Add a new activity to recent updates
    const request = requests.find(req => req.id === id);
    if (request) {
      const newUpdate = {
        id: recentUpdates.length + 1,
        type: "assignment",
        equipmentName: selectedEquipment,
        farmerName: request.name,
        timestamp: new Date().toLocaleString(),
        details: `${selectedEquipment} assigned to ${request.name} for ${request.services.join(', ')}`
      };
      
      // In a real app, you would update this state
      // This is just to show the concept
      console.log("New update added:", newUpdate);
    }
  };

  // Handle opening assign modal
  const openAssignModal = (request) => {
    setSelectedRequest(request);
    setIsAssignModalOpen(true);
    // Pre-fill the date with preferred date if available
    if (request.preferredDate) {
      setScheduledDate(request.preferredDate);
    }
  };

  // Handle viewing request details
  const viewRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting
  const sortedRequests = [...requests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Filter requests based on status and search term
  const filteredRequests = sortedRequests.filter((req) => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = 
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.MobileNo.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const pendingCount = requests.filter(req => req.status === 'pending').length;
  const acceptedCount = requests.filter(req => req.status === 'accepted').length;
  const rejectedCount = requests.filter(req => req.status === 'rejected').length;
  const totalLandArea = requests
    .filter(req => req.status === 'accepted')
    .reduce((sum, req) => sum + req.landArea, 0);
  
  // Equipment statistics
  const assignedCount = equipmentList.filter(eq => eq.status === 'assigned').length;
  const availableCount = equipmentList.filter(eq => eq.status === 'available').length;
  const maintenanceCount = equipmentList.filter(eq => eq.status === 'maintenance').length;

  // Render map component (simplified for this example)
  const renderMap = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 h-64 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Location Map</h2>
        <div className="bg-blue-50 h-full rounded-lg flex items-center justify-center">
          {/* In a real application, this would be a proper map component */}
          <div className="text-center text-gray-500">
            <p>Interactive map would be displayed here</p>
            <p className="text-sm mt-2">Showing locations of 5 equipment across Uttar Pradesh</p>
          </div>
          
          {/* Map markers explanation (for demonstration) */}
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow text-sm">
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>Available</span>
            </div>
            <div className="flex items-center mb-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              <span>Assigned</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span>Maintenance</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white text-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Service Provider Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">Online</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar - Statistics */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Total Requests</span>
                <span className="text-lg font-semibold">{requests.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700">Pending</span>
                <span className="text-lg font-semibold">{pendingCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Accepted</span>
                <span className="text-lg font-semibold">{acceptedCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-700">Rejected</span>
                <span className="text-lg font-semibold">{rejectedCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700">Land Area Serviced</span>
                <span className="text-lg font-semibold">{totalLandArea.toFixed(1)} acres</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Assigned</span>
                <span className="text-lg font-semibold">{assignedCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Available</span>
                <span className="text-lg font-semibold">{availableCount}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700">Maintenance</span>
                <span className="text-lg font-semibold">{maintenanceCount}</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              {recentUpdates.slice(0, 4).map((update) => (
                <div key={update.id} className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">
                      {update.type === 'assignment' ? '🔄 Assignment' : 
                       update.type === 'maintenance' ? '🔧 Maintenance' :
                       update.type === 'completion' ? '✅ Completion' :
                       update.type === 'request' ? '📝 New Request' : '🚚 Movement'}
                    </span>
                    <span className="text-xs text-gray-500">{update.timestamp.split(' ')[0]}</span>
                  </div>
                  <p className="text-sm mt-1">{update.details}</p>
                </div>
              ))}
              <button className="w-full mt-2 text-blue-600 text-sm hover:underline">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab('requests')}
                className={`px-6 py-3 font-medium ${activeTab === 'requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Service Requests
              </button>
              <button 
                onClick={() => setActiveTab('equipment')}
                className={`px-6 py-3 font-medium ${activeTab === 'equipment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Equipment Management
              </button>
              <button 
                onClick={() => setActiveTab('map')}
                className={`px-6 py-3 font-medium ${activeTab === 'map' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Map View
              </button>
            </div>
          </div>

          {/* Map View */}
          {activeTab === 'map' && (
            <>
              {renderMap()}
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Equipment Locations & Assignments</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">Equipment</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Assigned To</th>
                        <th scope="col" className="px-6 py-3">Scheduled Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {equipmentList.map((equipment) => (
                        <tr key={equipment.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">{equipment.name}</td>
                          <td className="px-6 py-4">
                            {equipment.location.lat.toFixed(4)}, {equipment.location.lng.toFixed(4)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                equipment.status === 'available'
                                  ? 'bg-green-200 text-green-800'
                                  : equipment.status === 'assigned'
                                  ? 'bg-blue-200 text-blue-800'
                                  : 'bg-orange-200 text-orange-800'
                              }`}
                            >
                              {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">{equipment.assignedTo || "N/A"}</td>
                          <td className="px-6 py-4">{equipment.assignedDate || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Equipment Management */}
          {activeTab === 'equipment' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Equipment Management</h2>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Add New Equipment
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">ID</th>
                      <th scope="col" className="px-6 py-3">Equipment Name</th>
                      <th scope="col" className="px-6 py-3">Type</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Last Maintenance</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipmentList.map((equipment) => (
                      <tr key={equipment.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{equipment.id}</td>
                        <td className="px-6 py-4 font-medium">{equipment.name}</td>
                        <td className="px-6 py-4">{equipment.type}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              equipment.status === 'available'
                                ? 'bg-green-200 text-green-800'
                                : equipment.status === 'assigned'
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-orange-200 text-orange-800'
                            }`}
                          >
                            {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">{equipment.lastMaintenance}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                              Details
                            </button>
                            <button className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                              Track
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Requests View */}
          {activeTab === 'requests' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">Farmer Service Requests</h2>
                
                {/* Search bar */}
                <div className="relative w-full md:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name, address, or mobile"
                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg ${
                    filterStatus === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  All Requests
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-4 py-2 rounded-lg ${
                    filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setFilterStatus('accepted')}
                  className={`px-4 py-2 rounded-lg ${
                    filterStatus === 'accepted' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Accepted ({acceptedCount})
                </button>
                <button
                  onClick={() => setFilterStatus('rejected')}
                  className={`px-4 py-2 rounded-lg ${
                    filterStatus === 'rejected' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Rejected ({rejectedCount})
                </button>
              </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('id')}>
                        ID {sortConfig.key === 'id' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                        Farmer Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-6 py-3">Mobile No</th>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('landArea')}>
                        Land Area {sortConfig.key === 'landArea' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-6 py-3">Services</th>
                      <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('status')}>
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((req) => (
                        <tr key={req.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4">{req.id}</td>
                          <td className="px-6 py-4 font-medium">{req.name}</td>
                          <td className="px-6 py-4">{req.MobileNo}</td>
                          <td className="px-6 py-4">{req.landArea} acres</td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {req.services.map((service, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                req.status === 'pending'
                                  ? 'bg-yellow-200 text-yellow-800'
                                  : req.status === 'accepted'
                                  ? 'bg-blue-200 text-blue-800'
                                  : 'bg-red-200 text-red-800'
                              }`}
                            >
                              {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => viewRequestDetails(req)}
                                className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                              >
                                View
                              </button>
                              {req.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => openAssignModal(req)}
                                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                  >
                                    Assign
                                  </button>
                                  <button
                                    onClick={() => updateRequestStatus(req.id, 'rejected')}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center">
                          No requests found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Request Details</h3>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Farmer Name</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium">{selectedRequest.MobileNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedRequest.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Land Area</p>
                  <p className="font-medium">{selectedRequest.landArea} acres</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Crop Type</p>
                  <p className="font-medium">{selectedRequest.crop}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Soil Type</p>
                  <p className="font-medium">{selectedRequest.soilType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Services Requested</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedRequest.services.map((service, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="font-medium">{selectedRequest.requestDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Preferred Date</p>
                  <p className="font-medium">{selectedRequest.preferredDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Previous Service</p>
                  <p className="font-medium">{selectedRequest.previousService}</p>
                </div>
                {selectedRequest.status === 'accepted' && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Scheduled Date</p>
                      <p className="font-medium">{selectedRequest.scheduledDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assigned Equipment</p>
                      <p className="font-medium">{selectedRequest.assignedEquipment}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Notes</p>
                <p className="bg-gray-50 p-3 rounded-lg mt-1">{selectedRequest.notes}</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                {selectedRequest.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        setIsDetailModalOpen(false);
                        openAssignModal(selectedRequest);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Assign Equipment
                    </button>
                    <button
                      onClick={() => {
                        updateRequestStatus(selectedRequest.id, 'rejected');
                        setIsDetailModalOpen(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Reject Request
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Equipment Modal */}
      {isAssignModalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Assign Equipment & Schedule</h3>
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="font-medium mb-1">Farmer: {selectedRequest.name}</p>
                <p className="text-sm text-gray-600 mb-1">Services: {selectedRequest.services.join(', ')}</p>
                <p className="text-sm text-gray-600">Land Area: {selectedRequest.landArea} acres</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Equipment</label>
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">-- Select Equipment --</option>
                  {equipmentList
                    .filter(eq => eq.status === 'available')
                    .map((equipment) => (
                      <option key={equipment.id} value={equipment.name}>
                        {equipment.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Schedule Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
                {selectedRequest.preferredDate && (
                  <p className="text-sm text-green-600 mt-1">
                    Farmer's preferred date: {selectedRequest.preferredDate}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAssignModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => assignEquipment(selectedRequest.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderDashboard;