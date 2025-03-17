import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, ChevronDown, Download, FileText, PieChart, Filter, TrendingUp, DollarSign } from 'lucide-react';

const ServiceReport = () => {
  // State management
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isReportListOpen, setIsReportListOpen] = useState(false);
  
  // Report form state
  const [reportType, setReportType] = useState('weekly');
  const [reportStartDate, setReportStartDate] = useState('');
  const [reportEndDate, setReportEndDate] = useState('');
  const [reportFormat, setReportFormat] = useState('pdf');
  
  // Analytics form state
  const [analyticsPeriod, setAnalyticsPeriod] = useState('month');
  const [analyticsMetric, setAnalyticsMetric] = useState('revenue');
  const [analyticsView, setAnalyticsView] = useState('both');
  
  // Sample data for analytics with added efficiency metrics
  const analyticsData = [
    { month: 'Jan', revenue: 45000, services: 150, equipment: 75, area: 500, farmers: 45, efficiency: 78, revenuePerService: 300 },
    { month: 'Feb', revenue: 52000, services: 170, equipment: 80, area: 550, farmers: 48, efficiency: 82, revenuePerService: 306 },
    { month: 'Mar', revenue: 49000, services: 160, equipment: 70, area: 520, farmers: 46, efficiency: 80, revenuePerService: 306 },
    { month: 'Apr', revenue: 58000, services: 185, equipment: 85, area: 600, farmers: 52, efficiency: 85, revenuePerService: 314 },
    { month: 'May', revenue: 63000, services: 195, equipment: 90, area: 650, farmers: 56, efficiency: 87, revenuePerService: 323 },
    { month: 'Jun', revenue: 59000, services: 180, equipment: 82, area: 580, farmers: 50, efficiency: 86, revenuePerService: 328 },
  ];
  
  // Sample service reports list
  const serviceReports = [
    { id: 1, title: 'Weekly Report - March 10-16, 2025', type: 'weekly', date: '2025-03-17', format: 'pdf' },
    { id: 2, title: 'Monthly Report - February 2025', type: 'monthly', date: '2025-03-01', format: 'excel' },
    { id: 3, title: 'Quarterly Report - Q1 2025', type: 'custom', date: '2025-03-31', format: 'pdf' },
    { id: 4, title: 'Equipment Usage Report - January 2025', type: 'monthly', date: '2025-02-01', format: 'csv' },
    { id: 5, title: 'Customer Feedback Summary - Q4 2024', type: 'custom', date: '2025-01-05', format: 'pdf' },
    { id: 6, title: 'Work Efficiency Analysis - Q1 2025', type: 'custom', date: '2025-04-01', format: 'pdf' },
  ];
  
  const handleReportSubmit = (e) => {
    e.preventDefault();
    alert('Report generated successfully!');
    setIsReportModalOpen(false);
  };
  
  const handleAnalyticsSubmit = (e) => {
    e.preventDefault();
    alert('Analytics report generated!');
    setIsAnalyticsModalOpen(false);
  };
  
  const viewReport = (reportId) => {
    alert(`Opening report #${reportId}`);
  };
  
  const downloadReport = (reportId, format) => {
    alert(`Downloading report #${reportId} in ${format} format`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Service Management Dashboard</h1>
          <p className="text-gray-600">Monitor service reports, performance analytics, efficiency and revenue</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Service Reports Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Service Reports</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsReportListOpen(!isReportListOpen)}
                  className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center"
                >
                  <FileText size={18} className="mr-2" />
                  View Reports
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Generate New Report
                </button>
              </div>
            </div>
            
            {/* Collapsible Reports List */}
            {isReportListOpen && (
              <div className="mt-4 border rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Report Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Type</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {serviceReports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{report.title}</td>
                        <td className="py-3 px-4 text-sm text-gray-500 capitalize">{report.type}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{report.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => viewReport(report.id)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              View
                            </button>
                            <button 
                              onClick={() => downloadReport(report.id, report.format)}
                              className="p-1 text-green-600 hover:text-green-800 flex items-center"
                            >
                              <Download size={16} className="mr-1" />
                              {report.format.toUpperCase()}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Recent Reports Summary */}
            {!isReportListOpen && (
              <div className="space-y-4">
                <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Weekly Report - March 10-16, 2025</p>
                    <p className="text-sm text-gray-600">Generated on March 17, 2025</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </div>
                <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Work Efficiency Analysis - Q1 2025</p>
                    <p className="text-sm text-gray-600">Generated on April 1, 2025</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Analytics Overview Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Analytics Overview</h2>
              <button 
                onClick={() => setIsAnalyticsModalOpen(true)}
                className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
              >
                <PieChart size={18} className="mr-2" />
                View Detailed Analytics
              </button>
            </div>
            
            {/* Analytics Summary Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.slice(-3)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
                  <Bar dataKey="efficiency" name="Efficiency (%)" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm text-purple-600">Total Revenue</p>
                <p className="text-xl font-bold text-purple-800">$326,000</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-600">Services</p>
                <p className="text-xl font-bold text-blue-800">1,040</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-600">Efficiency</p>
                <p className="text-xl font-bold text-orange-800">83%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-600">Farmers</p>
                <p className="text-xl font-bold text-green-800">297</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Efficiency and Revenue Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Work Efficiency Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Work Efficiency</h2>
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-lg text-orange-700">
                <TrendingUp size={18} />
                <span className="font-medium">+8% YTD</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#ff7300" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Efficiency Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Average Completion Time</p>
                <p className="text-lg font-medium text-gray-800">4.2 hours</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Resource Utilization</p>
                <p className="text-lg font-medium text-gray-800">91%</p>
              </div>
            </div>
          </div>
          
          {/* Revenue Analysis Card */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Revenue Analysis</h2>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-lg text-green-700">
                <DollarSign size={18} />
                <span className="font-medium">+15% YTD</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" name="Total Revenue ($)" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="revenuePerService" name="Revenue Per Service ($)" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Revenue Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Revenue Growth Rate</p>
                <p className="text-lg font-medium text-gray-800">9.3%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Avg. Revenue per Farmer</p>
                <p className="text-lg font-medium text-gray-800">$1,098</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Trends Row */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Service Performance Trends</h2>
              <div className="flex items-center gap-2">
                <select className="p-2 border rounded-lg text-sm">
                  <option value="6months">Last 6 Months</option>
                  <option value="year">Last Year</option>
                  <option value="all">All Time</option>
                </select>
                <button className="p-2 bg-gray-100 rounded-lg">
                  <Filter size={18} />
                </button>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="services" name="Services Completed" stroke="#82ca9d" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report Generation Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Generate Service Report</h2>
            <form onSubmit={handleReportSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="daily">Daily Report</option>
                  <option value="weekly">Weekly Report</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="custom">Custom Period</option>
                </select>
              </div>
              {(reportType === 'custom') && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={reportStartDate}
                      onChange={(e) => setReportStartDate(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required={reportType === 'custom'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={reportEndDate}
                      onChange={(e) => setReportEndDate(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required={reportType === 'custom'}
                    />
                  </div>
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Report Format</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="pdf"
                      checked={reportFormat === 'pdf'}
                      onChange={(e) => setReportFormat(e.target.value)}
                      className="mr-2"
                    />
                    PDF
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="excel"
                      checked={reportFormat === 'excel'}
                      onChange={(e) => setReportFormat(e.target.value)}
                      className="mr-2"
                    />
                    Excel
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="csv"
                      checked={reportFormat === 'csv'}
                      onChange={(e) => setReportFormat(e.target.value)}
                      className="mr-2"
                    />
                    CSV
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Include Sections</label>
                <div className="space-y-2">
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Service Summary
                  </label>
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Equipment Usage
                  </label>
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Work Efficiency
                  </label>
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Customer Feedback
                  </label>
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Financial Overview
                  </label>
                  <label className="inline-flex items-center block">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    Revenue Analysis
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Analytics Modal */}
      {isAnalyticsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">View Analytics Report</h2>
            <form onSubmit={handleAnalyticsSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Time Period</label>
                <select
                  value={analyticsPeriod}
                  onChange={(e) => setAnalyticsPeriod(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              {analyticsPeriod === 'custom' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      required={analyticsPeriod === 'custom'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg"
                      required={analyticsPeriod === 'custom'}
                    />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Metrics to View</label>
                <select
                  value={analyticsMetric}
                  onChange={(e) => setAnalyticsMetric(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="revenue">Revenue</option>
                  <option value="efficiency">Work Efficiency</option>
                  <option value="revenuePerService">Revenue Per Service</option>
                  <option value="services">Services Completed</option>
                  <option value="equipment">Equipment Usage</option>
                  <option value="area">Land Area Serviced</option>
                  <option value="farmers">Farmers Served</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">View Type</label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="chart"
                      checked={analyticsView === 'chart'}
                      onChange={(e) => setAnalyticsView(e.target.value)}
                      className="mr-2"
                    />
                    Chart
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="table"
                      checked={analyticsView === 'table'}
                      onChange={(e) => setAnalyticsView(e.target.value)}
                      className="mr-2"
                    />
                    Table
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="both"
                      checked={analyticsView === 'both'}
                      onChange={(e) => setAnalyticsView(e.target.value)}
                      className="mr-2"
                    />
                    Both
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAnalyticsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Generate Analytics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceReport;