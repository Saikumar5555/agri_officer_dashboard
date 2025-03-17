import React, { useState, useEffect, useRef } from 'react';

// Map component to show equipment locations
const FarmMap = ({ equipment, locations, farmCenter }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  
  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    
    // Initialize map
    if (!map && mapRef.current) {
      // Load Leaflet using CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.async = true;
      script.onload = () => {
        // Leaflet will be available as L in the global scope
        const L = window.L;
        const newMap = L.map(mapRef.current).setView([farmCenter.lat, farmCenter.lng], 14);
        
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(newMap);
        
        // Add location markers
        locations.forEach(location => {
          L.marker([location.lat, location.lng], {
            icon: L.divIcon({
              className: 'location-marker',
              html: `<div style="background-color: #4a5568; color: white; border-radius: 0.5rem; padding: 0.25rem; font-size: 0.75rem;">${location.name}</div>`,
              iconSize: [100, 20]
            })
          }).addTo(newMap);
        });
        
        // Add equipment markers
        equipment.forEach(item => {
          let markerColor;
          switch (item.status) {
            case 'available':
              markerColor = '#10B981'; // green-500 equivalent
              break;
            case 'in_use':
              markerColor = '#3B82F6'; // blue-500 equivalent
              break;
            case 'maintenance':
              markerColor = '#F59E0B'; // orange/amber-500 equivalent
              break;
            case 'repair':
              markerColor = '#EF4444'; // red-500 equivalent
              break;
            default:
              markerColor = '#6B7280'; // gray-500 equivalent
          }
          
          const equipmentIcon = L.divIcon({
            className: 'equipment-marker',
            html: `<div style="background-color: ${markerColor}; border-radius: 9999px; padding: 0.5rem; border: 2px solid white; height: 24px; width: 24px;"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          
          const marker = L.marker([item.lat, item.lng], { icon: equipmentIcon }).addTo(newMap);
          marker.bindPopup(`
            <div>
              <strong>${item.name}</strong><br>
              <span>Type: ${item.type}</span><br>
              <span>Status: ${item.status}</span><br>
              <span>Location: ${item.location}</span>
            </div>
          `);
        });
        
        setMap(newMap);
      };
      
      document.head.appendChild(script);
    }
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [equipment, locations, map, farmCenter]);
  
  return <div ref={mapRef} className="h-full w-full"></div>;
};

const FarmEquipmentManager = () => {
  // State variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'update', or 'maintenance'
  const [equipmentList, setEquipmentList] = useState([
    {
      id: 1,
      name: 'John Deere 5045D Tractor',
      type: 'tractor',
      model: '5045D',
      purchaseDate: '2022-03-15',
      notes: 'Diesel engine, 45 HP',
      status: 'available',
      lastServiceDate: '2023-12-10',
      location: 'North Field Barn',
      lat: 42.1234, 
      lng: -92.1234
    },
    {
      id: 2,
      name: 'Case IH 2388 Combine Harvester',
      type: 'harvester',
      model: '2388',
      purchaseDate: '2021-07-22',
      notes: 'Cross-Flow cleaning system',
      status: 'in_use',
      lastServiceDate: '2024-01-05',
      location: 'Main Equipment Shed',
      lat: 42.1334, 
      lng: -92.1434
    },
    {
      id: 3,
      name: 'Kinze 3600 Planter',
      type: 'seeder',
      model: '3600',
      purchaseDate: '2023-02-10',
      notes: '12-row planter',
      status: 'maintenance',
      lastServiceDate: '2024-02-15',
      location: 'Workshop',
      lat: 42.1284, 
      lng: -92.1384
    },
    {
      id: 4,
      name: 'Kubota M7060 Tractor',
      type: 'tractor',
      model: 'M7060',
      purchaseDate: '2022-05-18',
      notes: 'Hydrostatic transmission',
      status: 'available',
      lastServiceDate: '2023-11-20',
      location: 'South Field Storage',
      lat: 42.1134, 
      lng: -92.1334
    }
  ]);
  
  // Farm locations with coordinates (hardcoded)
  const farmLocations = [
    { name: 'North Field Barn', lat: 42.1234, lng: -92.1234 },
    { name: 'South Field Storage', lat: 42.1134, lng: -92.1334 },
    { name: 'Main Equipment Shed', lat: 42.1334, lng: -92.1434 },
    { name: 'Workshop', lat: 42.1284, lng: -92.1384 },
    { name: 'West Pasture Shelter', lat: 42.1184, lng: -92.1534 },
    { name: 'East Field Storage', lat: 42.1384, lng: -92.1234 },
    { name: 'Grain Storage Facility', lat: 42.1254, lng: -92.1294 },
    { name: 'Irrigation Pump House', lat: 42.1154, lng: -92.1254 }
  ];
  
  // Center of the farm for map initialization
  const farmCenter = { lat: 42.1254, lng: -92.1334 };
  
  // Form state variables
  const [equipmentName, setEquipmentName] = useState('New Holland T6.175');
  const [equipmentType, setEquipmentType] = useState('tractor');
  const [equipmentModel, setEquipmentModel] = useState('T6.175');
  const [purchaseDate, setPurchaseDate] = useState('2024-01-15');
  const [additionalNotes, setAdditionalNotes] = useState('175 HP, climate controlled cab');
  const [equipmentStatus, setEquipmentStatus] = useState('available');
  const [lastServiceDate, setLastServiceDate] = useState('2024-02-20');
  const [maintenanceDate, setMaintenanceDate] = useState('2024-04-15');
  const [maintenanceType, setMaintenanceType] = useState('routine');
  const [maintenanceNotes, setMaintenanceNotes] = useState('500-hour service including oil change and filter replacement');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(1);
  const [equipmentLocation, setEquipmentLocation] = useState('North Field Barn');
  
  // Open modal with specific type
  const openModal = (type, equipmentId = null) => {
    setModalType(type);
    setIsModalOpen(true);
    
    // Reset form fields
    if (type === 'add') {
      setEquipmentName('New Holland T6.175');
      setEquipmentType('tractor');
      setEquipmentModel('T6.175');
      setPurchaseDate('2024-01-15');
      setAdditionalNotes('175 HP, climate controlled cab');
      setEquipmentLocation('Main Equipment Shed');
    } else if (equipmentId) {
      const equipment = equipmentList.find(item => item.id === equipmentId);
      setSelectedEquipmentId(equipmentId);
      setEquipmentStatus(equipment.status);
      setLastServiceDate(equipment.lastServiceDate);
      setEquipmentLocation(equipment.location);
      
      if (type === 'maintenance') {
        setMaintenanceDate('2024-04-15');
        setMaintenanceType('routine');
        setMaintenanceNotes('500-hour service including oil change and filter replacement');
      }
    } else {
      setSelectedEquipmentId('');
      setEquipmentStatus('available');
      setLastServiceDate('2024-02-20');
      setMaintenanceDate('2024-04-15');
      setMaintenanceType('routine');
      setMaintenanceNotes('500-hour service including oil change and filter replacement');
      setEquipmentLocation('North Field Barn');
    }
  };
  
  // Handle form submissions
  const handleAddEquipment = (e) => {
    e.preventDefault();
    // Find location coordinates from the selected location name
    const locationData = farmLocations.find(loc => loc.name === equipmentLocation);
    
    const newEquipment = {
      id: Date.now(), // Simple unique ID generator
      name: `${equipmentName} ${equipmentModel}`,
      type: equipmentType,
      model: equipmentModel,
      purchaseDate: purchaseDate,
      notes: additionalNotes,
      status: 'available',
      lastServiceDate: lastServiceDate || new Date().toISOString().split('T')[0],
      location: equipmentLocation,
      lat: locationData.lat,
      lng: locationData.lng
    };
    
    setEquipmentList([...equipmentList, newEquipment]);
    alert('Equipment added successfully!');
    setIsModalOpen(false);
  };
  
  const handleUpdateEquipment = () => {
    if (!selectedEquipmentId) return;
    
    // Find location coordinates from the selected location name
    const locationData = farmLocations.find(loc => loc.name === equipmentLocation);
    
    const updatedList = equipmentList.map(item => {
      if (item.id === selectedEquipmentId) {
        return {
          ...item,
          status: equipmentStatus,
          lastServiceDate: lastServiceDate,
          location: equipmentLocation,
          lat: locationData.lat,
          lng: locationData.lng
        };
      }
      return item;
    });
    
    setEquipmentList(updatedList);
    alert('Equipment updated successfully!');
    setIsModalOpen(false);
  };
  
  const handleDeleteEquipment = () => {
    if (!selectedEquipmentId) return;
    
    setEquipmentList(equipmentList.filter(item => item.id !== selectedEquipmentId));
    alert('Equipment deleted successfully!');
    setIsModalOpen(false);
  };
  
  const handleScheduleMaintenance = (e) => {
    e.preventDefault();
    if (!selectedEquipmentId) return;
    
    const updatedList = equipmentList.map(item => {
      if (item.id === selectedEquipmentId) {
        return {
          ...item,
          status: 'maintenance',
          // In a real app, you would store maintenance history separately
        };
      }
      return item;
    });
    
    setEquipmentList(updatedList);
    alert('Maintenance scheduled successfully!');
    setIsModalOpen(false);
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in_use':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'repair':
        return 'bg-red-100 text-red-800';
      case 'retired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };
  
  // Get formatted status text
  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'in_use':
        return 'In Use';
      case 'maintenance':
        return 'Maintenance';
      case 'repair':
        return 'Needs Repair';
      case 'retired':
        return 'Retired/Sold';
      default:
        return 'Available';
    }
  };
  
  // Render the appropriate form based on modal type
  const renderForm = () => {
    switch (modalType) {
      case 'add':
        return (
          <form onSubmit={handleAddEquipment}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Equipment Name</label>
              <input
                type="text"
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., John Deere"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Equipment Type</label>
              <select
                value={equipmentType}
                onChange={(e) => setEquipmentType(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="tractor">Tractor</option>
                <option value="harvester">Harvester</option>
                <option value="seeder">Seeder/Planter</option>
                <option value="sprayer">Sprayer</option>
                <option value="tillage">Tillage Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Model Number</label>
              <input
                type="text"
                value={equipmentModel}
                onChange={(e) => setEquipmentModel(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 5045D"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Purchase Date</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Equipment Location</label>
              <select
                value={equipmentLocation}
                onChange={(e) => setEquipmentLocation(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                {farmLocations.map((location, idx) => (
                  <option key={idx} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Service Date</label>
              <input
                type="date"
                value={lastServiceDate}
                onChange={(e) => setLastServiceDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Additional Notes</label>
              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="3"
                placeholder="Any special features or considerations..."
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Add Equipment
              </button>
            </div>
          </form>
        );
        
      case 'update':
        return (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Equipment</label>
              <select
                value={selectedEquipmentId}
                onChange={(e) => setSelectedEquipmentId(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">-- Select Equipment --</option>
                {equipmentList.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Current Status</label>
              <select
                value={equipmentStatus}
                onChange={(e) => setEquipmentStatus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="available">Available</option>
                <option value="in_use">In Use</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="repair">Needs Repair</option>
                <option value="retired">Retired/Sold</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Equipment Location</label>
              <select
                value={equipmentLocation}
                onChange={(e) => setEquipmentLocation(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {farmLocations.map((location, idx) => (
                  <option key={idx} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Last Service Date</label>
              <input
                type="date"
                value={lastServiceDate}
                onChange={(e) => setLastServiceDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteEquipment}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Equipment
              </button>
              <button
                type="button"
                onClick={handleUpdateEquipment}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Update Equipment
              </button>
            </div>
          </div>
        );
        
      case 'maintenance':
        return (
          <form onSubmit={handleScheduleMaintenance}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Equipment</label>
              <select
                value={selectedEquipmentId}
                onChange={(e) => setSelectedEquipmentId(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">-- Select Equipment --</option>
                {equipmentList.map((equipment) => (
                  <option key={equipment.id} value={equipment.id}>
                    {equipment.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Maintenance Type</label>
              <select
                value={maintenanceType}
                onChange={(e) => setMaintenanceType(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="routine">Routine Service</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
                <option value="overhaul">Major Overhaul</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Service Location</label>
              <select
                value={equipmentLocation}
                onChange={(e) => setEquipmentLocation(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="Workshop">Workshop</option>
                <option value="Field Service">Field Service</option>
                <option value="Dealer Service Center">Dealer Service Center</option>
                <option value="Main Equipment Shed">Main Equipment Shed</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Scheduled Date</label>
              <input
                type="date"
                value={maintenanceDate}
                onChange={(e) => setMaintenanceDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Maintenance Notes</label>
              <textarea
                value={maintenanceNotes}
                onChange={(e) => setMaintenanceNotes(e.target.value)}
                className="w-full p-2 border rounded-lg"
                rows="3"
                placeholder="Describe the maintenance requirements..."
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Schedule Maintenance
              </button>
            </div>
          </form>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Farm Equipment Manager</h1>
      
      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => openModal('add')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add New Equipment
        </button>
        <button 
          onClick={() => openModal('update')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Equipment Status
        </button>
        <button 
          onClick={() => openModal('maintenance')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Schedule Maintenance
        </button>
      </div>
      
      {/* Equipment list */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Equipment Inventory</h2>
        
        {/* Location filter */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Filter by Location:</label>
          <select
            className="w-64 p-2 border rounded-lg"
            defaultValue="all"
          >
            <option value="all">All Locations</option>
            {farmLocations.map((location, idx) => (
              <option key={idx} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Equipment Name</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Location</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Last Service</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((equipment) => (
                <tr key={equipment.id} className="border-b">
                  <td className="p-3">{equipment.name}</td>
                  <td className="p-3 capitalize">{equipment.type}</td>
                  <td className="p-3">{equipment.location}</td>
                  <td className="p-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(equipment.status)}`}>
                      {getStatusText(equipment.status)}
                    </span>
                  </td>
                  <td className="p-3">{equipment.lastServiceDate}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => openModal('update', equipment.id)}
                      className="mr-2 text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => openModal('maintenance', equipment.id)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      Maintenance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Equipment location map */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Equipment Locations</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div id="map" className="border rounded-lg h-96 overflow-hidden">
              <FarmMap 
                equipment={equipmentList} 
                locations={farmLocations} 
                farmCenter={farmCenter} 
              />
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="border rounded-lg p-4 bg-gray-50 h-full">
              <h3 className="text-lg font-medium mb-3">Equipment by Location</h3>
              <div className="space-y-2">
                {farmLocations.map((location, idx) => {
                  const count = equipmentList.filter(eq => eq.location === location.name).length;
                  return (
                    <div key={idx} className="flex justify-between border-b pb-1">
                      <span>{location.name}:</span>
                      <span className="font-medium">{count} items</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-md font-medium mb-2">Legend</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                    <span>In Use</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                    <span>Maintenance</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span>Needs Repair</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === 'add' ? 'Add New Equipment' : 
               modalType === 'update' ? 'Update Equipment Status' : 
               'Schedule Maintenance'}
            </h2>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmEquipmentManager;