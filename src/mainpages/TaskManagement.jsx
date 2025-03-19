import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskManagement = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  // Sample tasks data
  const tasks = [
    { id: 1, title: 'Field Inspection - Riverside Village', date: '2025-03-20', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Training Program - Organic Farming', date: '2025-03-25', priority: 'Medium', status: 'Scheduled' },
    { id: 3, title: 'Subsidy Verification - East District', date: '2025-03-18', priority: 'High', status: 'Completed' },
    { id: 4, title: 'Crop Assessment - Wheat Fields', date: '2025-03-22', priority: 'Medium', status: 'Pending' },
    { id: 5, title: 'Farmer Meeting - Pest Control', date: '2025-03-19', priority: 'Low', status: 'Scheduled' }
  ];
  
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    alert('Task created successfully!');
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md  m-5">
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
    </>
  );
};

export default TaskManagement;