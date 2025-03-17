import React, { useState, useEffect } from 'react';

// Services Tab Component
const ServicesManagement = () => {
  const [activeTab, setActiveTab] = useState('services-list');
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    duration: '',
    equipment: []
  });
  const [serviceRequests, setServiceRequests] = useState([]);
  
  // Mock data for services offered
  const mockServices = [
    {
      id: 1,
      name: "Land Plowing",
      description: "Comprehensive plowing service using modern equipment suitable for various soil types.",
      category: "Pre-Sowing",
      price: 2500, // per acre
      duration: "1-2 days",
      equipment: ["Tractor - John Deere 5045D", "Rotavator - Sonalika"],
      image: "plowing.jpg",
      isActive: true,
      completedJobs: 45
    },
    {
      id: 2,
      name: "Crop Harvesting",
      description: "Efficient harvesting of various crops including wheat, rice, and maize.",
      category: "Post-Growth",
      price: 3000, // per acre
      duration: "1-3 days",
      equipment: ["Harvester - New Holland TC5.30"],
      image: "harvesting.jpg",
      isActive: true,
      completedJobs: 38
    },
    {
      id: 3,
      name: "Seed Drilling",
      description: "Precise seed placement at optimal depth and spacing for maximum germination.",
      category: "Sowing",
      price: 1800, // per acre
      duration: "1 day",
      equipment: ["Seed Drill - Mahindra Yuvo"],
      image: "seeding.jpg",
      isActive: true,
      completedJobs: 62
    },
    {
      id: 4,
      name: "Pesticide Spraying",
      description: "Application of pesticides and insecticides with precise coverage.",
      category: "Crop Care",
      price: 1200, // per acre
      duration: "1 day",
      equipment: ["Sprayer - HTP 4-Stroke"],
      image: "spraying.jpg",
      isActive: true,
      completedJobs: 53
    },
    {
      id: 5,
      name: "Fertilizer Application",
      description: "Balanced application of fertilizers based on soil requirements.",
      category: "Crop Care",
      price: 1500, // per acre
      duration: "1 day",
      equipment: ["Tractor - John Deere 5045D", "Fertilizer Spreader"],
      image: "fertilizing.jpg",
      isActive: true,
      completedJobs: 41
    },
    {
      id: 6,
      name: "Crop Transportation",
      description: "Safe and efficient transportation of harvested crops to warehouses or markets.",
      category: "Post-Harvest",
      price: 2000, // per trip
      duration: "Depends on distance",
      equipment: ["Tractor - John Deere 5045D", "Trailer"],
      image: "transportation.jpg",
      isActive: true,
      completedJobs: 28
    }
  ];

  // Mock data for service requests
  const mockServiceRequests = [
    {
      id: 101,
      farmerName: "Rajesh Kumar",
      serviceName: "Land Plowing",
      landArea: 5.5,
      location: "Village Amritpur, Dist. Lucknow, UP",
      requestDate: "2025-03-10",
      scheduledDate: "2025-03-20",
      status: "new",
      priority: "high",
      notes: "Requires immediate attention due to upcoming sowing season."
    },
    {
      id: 102,
      farmerName: "Sunita Patel",
      serviceName: "Crop Harvesting",
      landArea: 3.2,
      location: "Sundarpur, Dist. Varanasi, UP",
      requestDate: "2025-03-08",
      scheduledDate: "2025-03-25",
      status: "ongoing",
      priority: "medium",
      startDate: "2025-03-25",
      estimatedCompletion: "2025-03-26",
      assignedTo: "Operator: Amit Yadav",
      progress: 30,
      equipmentAssigned: "Harvester - New Holland TC5.30",
      notes: "Harvesting in progress, 30% completed."
    },
    {
      id: 103,
      farmerName: "Mahesh Singh",
      serviceName: "Seed Drilling",
      landArea: 7.8,
      location: "Gopalpur, Dist. Kanpur, UP",
      requestDate: "2025-03-05",
      scheduledDate: "2025-03-15",
      status: "completed",
      priority: "medium",
      startDate: "2025-03-15",
      completionDate: "2025-03-16",
      assignedTo: "Operator: Rakesh Sharma",
      equipmentAssigned: "Seed Drill - Mahindra Yuvo",
      paymentStatus: "Paid",
      farmerFeedback: 4.5,
      notes: "Successfully completed, farmer was satisfied with the service."
    },
    {
      id: 104,
      farmerName: "Priya Verma",
      serviceName: "Pesticide Spraying",
      landArea: 4.0,
      location: "Chandpur, Dist. Agra, UP",
      requestDate: "2025-03-12",
      scheduledDate: "2025-03-18",
      status: "new",
      priority: "urgent",
      notes: "Pest infestation reported, requires immediate attention."
    },
    {
      id: 105,
      farmerName: "Ankit Sharma",
      serviceName: "Crop Harvesting",
      landArea: 6.3,
      location: "Dhanpur, Dist. Meerut, UP",
      requestDate: "2025-03-07",
      scheduledDate: "2025-03-24",
      status: "ongoing",
      priority: "high",
      startDate: "2025-03-24",
      estimatedCompletion: "2025-03-26",
      assignedTo: "Operator: Vijay Singh",
      progress: 60,
      equipmentAssigned: "Harvester - New Holland TC5.30",
      notes: "Harvesting in progress, 60% completed."
    },
    {
      id: 106,
      farmerName: "Deepak Mishra",
      serviceName: "Fertilizer Application",
      landArea: 3.5,
      location: "Ratanpur, Dist. Allahabad, UP",
      requestDate: "2025-03-02",
      scheduledDate: "2025-03-10",
      status: "completed",
      priority: "medium",
      startDate: "2025-03-10",
      completionDate: "2025-03-10",
      assignedTo: "Operator: Sanjay Kumar",
      equipmentAssigned: "Tractor - John Deere 5045D, Fertilizer Spreader",
      paymentStatus: "Pending",
      farmerFeedback: 5.0,
      notes: "Service completed on time, awaiting payment."
    },
    {
      id: 107,
      farmerName: "Geeta Devi",
      serviceName: "Land Plowing",
      landArea: 4.2,
      location: "Shivpur, Dist. Gorakhpur, UP",
      requestDate: "2025-03-13",
      scheduledDate: "2025-03-21",
      status: "new",
      priority: "medium",
      notes: "Preparing for rice cultivation."
    }
  ];

  // Load mock data initially
  useEffect(() => {
    setServices(mockServices);
    setServiceRequests(mockServiceRequests);
  }, []);

  // Handle adding a new service
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({
      ...newService,
      [name]: value
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newService.name || !newService.description || !newService.category || !newService.price) {
      alert("Please fill all the required fields");
      return;
    }
    
    const newServiceObj = {
      id: services.length + 1,
      ...newService,
      price: parseFloat(newService.price),
      isActive: true,
      completedJobs: 0,
      equipment: newService.equipment.filter(eq => eq.trim() !== "").map(eq => eq.trim())
    };
    
    setServices([...services, newServiceObj]);
    
    // Reset form
    setNewService({
      name: '',
      description: '',
      category: '',
      price: '',
      duration: '',
      equipment: []
    });
    
    // Switch back to services list tab
    setActiveTab('services-list');
  };

  // Filter service requests by status
  const newRequests = serviceRequests.filter(req => req.status === 'new');
  const ongoingServices = serviceRequests.filter(req => req.status === 'ongoing');
  const completedServices = serviceRequests.filter(req => req.status === 'completed');

  // Statistics
  const totalServices = services.length;
  const totalActiveServices = services.filter(service => service.isActive).length;
  const totalCompletedJobs = services.reduce((total, service) => total + service.completedJobs, 0);
  const averageRating = completedServices.length > 0 
    ? (completedServices.reduce((sum, service) => sum + (service.farmerFeedback || 0), 0) / completedServices.length).toFixed(1) 
    : "N/A";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-lg mb-6 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('services-list')}
            className={`px-6 py-3 font-medium ${activeTab === 'services-list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Services List
          </button>
          <button 
            onClick={() => setActiveTab('add-service')}
            className={`px-6 py-3 font-medium ${activeTab === 'add-service' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Add New Service
          </button>
          <button 
            onClick={() => setActiveTab('service-requests')}
            className={`px-6 py-3 font-medium ${activeTab === 'service-requests' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Service Requests
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar - Statistics */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Services Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Total Services</span>
                <span className="text-lg font-semibold">{totalServices}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Active Services</span>
                <span className="text-lg font-semibold">{totalActiveServices}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700">Completed Jobs</span>
                <span className="text-lg font-semibold">{totalCompletedJobs}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700">Average Rating</span>
                <span className="text-lg font-semibold">{averageRating} ⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Requests</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">New Requests</span>
                <span className="text-lg font-semibold">{newRequests.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700">Ongoing</span>
                <span className="text-lg font-semibold">{ongoingServices.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-700">Completed</span>
                <span className="text-lg font-semibold">{completedServices.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-700">Urgent Priority</span>
                <span className="text-lg font-semibold">{serviceRequests.filter(req => req.priority === 'urgent').length}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
                Generate Service Report
              </button>
              <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
                Update Pricing
              </button>
              <button className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600">
                View Service Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          {/* Services List */}
          {activeTab === 'services-list' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Services We Provide</h2>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => setActiveTab('add-service')}
                >
                  Add New Service
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      <div className="text-4xl text-gray-400">
                        {service.name === "Land Plowing" ? "🚜" : 
                         service.name === "Crop Harvesting" ? "🌾" :
                         service.name === "Seed Drilling" ? "🌱" :
                         service.name === "Pesticide Spraying" ? "💦" :
                         service.name === "Fertilizer Application" ? "🧪" :
                         service.name === "Crop Transportation" ? "🚚" : "🧰"}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Category:</span>
                          <p className="font-medium">{service.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <p className="font-medium">₹{service.price}/acre</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{service.duration}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Completed Jobs:</span>
                          <p className="font-medium">{service.completedJobs}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Equipment Used:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.equipment.map((eq, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm">
                          {service.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Service Form */}
          {activeTab === 'add-service' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Service</h2>
              
              <form onSubmit={handleAddService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="name">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newService.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="e.g., Land Plowing"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="category">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={newService.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      required
                    >
                      <option value="">-- Select Category --</option>
                      <option value="Pre-Sowing">Pre-Sowing</option>
                      <option value="Sowing">Sowing</option>
                      <option value="Crop Care">Crop Care</option>
                      <option value="Post-Growth">Post-Growth</option>
                      <option value="Post-Harvest">Post-Harvest</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="price">
                      Price (₹ per acre) *
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={newService.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="e.g., 2500"
                      min="1"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2" htmlFor="duration">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      name="duration"
                      value={newService.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                      placeholder="e.g., 1-2 days"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="description">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newService.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    rows="4"
                    placeholder="Detailed description of the service..."
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Equipment Required
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Tractor - John Deere 5045D</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Harvester - New Holland TC5.30</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Seed Drill - Mahindra Yuvo</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Rotavator - Sonalika</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Sprayer - HTP 4-Stroke</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Fertilizer Spreader</span>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Trailer</span>
                  </div>
                  <input
                    type="text"
                    name="equipment"
                    value={newService.equipment}
                    onChange={(e) => setNewService({...newService, equipment: e.target.value.split(',')})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter equipment names separated by commas"
                  />
                  <p className="text-sm text-gray-500 mt-1">Enter equipment names separated by commas</p>
                </div>
                
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('services-list')}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Service Requests Tab */}
          {activeTab === 'service-requests' && (
            <div>
              {/* Sub-tabs for different request statuses */}
              <div className="flex mb-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-tl-lg rounded-bl-lg border-r border-blue-400">
                  New Requests ({newRequests.length})
                </button>
                <button className="px-4 py-2 bg-yellow-500 text-white border-r border-yellow-400">
                  Ongoing ({ongoingServices.length})
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-tr-lg rounded-br-lg">
                  Completed ({completedServices.length})
                </button>
              </div>

              {/* New Requests Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">New Service Requests</h2>
                
                {newRequests.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">ID</th>
                          <th scope="col" className="px-6 py-3">Farmer</th>
                          <th scope="col" className="px-6 py-3">Service</th>
                          <th scope="col" className="px-6 py-3">Land Area</th>
                          <th scope="col" className="px-6 py-3">Preferred Date</th>
                          <th scope="col" className="px-6 py-3">Priority</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newRequests.map((request) => (
                          <tr key={request.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{request.id}</td>
                            <td className="px-6 py-4 font-medium">{request.farmerName}</td>
                            <td className="px-6 py-4">{request.serviceName}</td>
                            <td className="px-6 py-4">{request.landArea} acres</td>
                            <td className="px-6 py-4">{request.scheduledDate}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  request.priority === 'urgent' ? 'bg-red-200 text-red-800' :
                                  request.priority === 'high' ? 'bg-orange-200 text-orange-800' :
                                  'bg-yellow-200 text-yellow-800'
                                }`}
                              >
                                {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                  View
                                </button>
                                <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                                  Assign
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">No new requests at this time.</p>
                )}
              </div>

              {/* Ongoing Services Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ongoing Services</h2>
                
                {ongoingServices.length > 0 ? (
                  <div className="space-y-4">
                    {ongoingServices.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between md:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{service.serviceName}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                service.priority === 'high' ? 'bg-orange-200 text-orange-800' : 'bg-yellow-200 text-yellow-800'
                              }`}>
                                {service.priority.charAt(0).toUpperCase() + service.priority.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-600">Farmer: {service.farmerName}</p>
                            <p className="text-gray-600">Location: {service.location}</p>
                            <p className="text-gray-600">Land Area: {service.landArea} acres</p>
                          </div>
                          <div className="mt-3 md:mt-0 text-right">
                            <p className="text-gray-600">Started: {service.startDate}</p>
                            <p className="text-gray-600">Estimated Completion: {service.estimatedCompletion}</p>
                            <p className="text-gray-600">{service.assignedTo}</p>
                            <p className="text-gray-600">Equipment: {service.equipmentAssigned}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">{service.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${service.progress}%` }}></div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-sm text-gray-500">{service.notes}</p>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                              Update
                            </button>
                            <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                              Mark Complete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">No ongoing services at this time.</p>
                )}
              </div>

              {/* Completed Services Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Services</h2>
                
                {completedServices.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3">ID</th>
                          <th scope="col" className="px-6 py-3">Service</th>
                          <th scope="col" className="px-6 py-3">Farmer</th>
                          <th scope="col" className="px-6 py-3">Completion Date</th>
                          <th scope="col" className="px-6 py-3">Payment</th>
                          <th scope="col" className="px-6 py-3">Rating</th>
                          <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedServices.map((service) => (
                          <tr key={service.id} className="border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{service.id}</td>
                            <td className="px-6 py-4 font-medium">{service.serviceName}</td>
                            <td className="px-6 py-4">{service.farmerName}</td>
                            <td className="px-6 py-4">{service.completionDate}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                service.paymentStatus === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-orange-200 text-orange-800'
                              }`}>
                                {service.paymentStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {service.farmerFeedback ? (
                                <div className="flex items-center">
                                  <span className="mr-1">{service.farmerFeedback}</span>
                                  <span className="text-yellow-500">★</span>
                                </div>
                              ) : "No rating"}
                            </td>
                            <td className="px-6 py-4">
                              <button className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">No completed services yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesManagement;