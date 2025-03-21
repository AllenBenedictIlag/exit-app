'use client';

import { useState } from 'react';
import ExitReasonsPieChart from '@/components/charts/ExitReasonsPieChart';
import DepartmentExitChart from '@/components/charts/DepartmentExitChart';
import TrendLineChart from '@/components/charts/TrendLineChart';
import ExitsByBusinessUnit from '@/components/charts/ExitsByBusinessUnit';
import RecommendationRatings from '@/components/charts/RecommendationRatings';
import WorkloadPerception from '@/components/charts/WorkloadPerception';
import { Download, Filter } from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('year');
  const [department, setDepartment] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Exit Interview Reports</h1>
        
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="btn-primary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            id="date-range"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        
        <div className="card p-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            id="department"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
            <option value="operations">Operations</option>
            <option value="finance">Finance</option>
            <option value="it">IT</option>
          </select>
        </div>
        
        <div className="card p-4 bg-gray-50">
          <div className="text-xs text-gray-500 uppercase font-semibold mb-1">Total Exits</div>
          <div className="text-3xl font-bold">
            147
            <span className="text-sm font-normal text-red-600 ml-2">+12% vs previous period</span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Exit rate: 8.2% of total workforce
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <ExitReasonsPieChart />
        </div>
        <div className="card p-6">
          <DepartmentExitChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <ExitsByBusinessUnit />
        </div>
        <div className="card p-6">
          <RecommendationRatings />
        </div>
        <div className="card p-6">
          <WorkloadPerception />
        </div>
      </div>

      <div className="card p-6">
        <TrendLineChart />
      </div>
      
      <div className="card">
        <h3 className="text-lg font-medium mb-4 p-6 pb-0">Exit Interview Insights</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Common Feedback
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { 
                  category: 'Work Environment', 
                  rating: 3.8, 
                  trend: 'up', 
                  feedback: 'Good team culture but office facilities need improvement' 
                },
                { 
                  category: 'Management', 
                  rating: 3.2, 
                  trend: 'down', 
                  feedback: 'Lack of clear communication from leadership' 
                },
                { 
                  category: 'Compensation', 
                  rating: 2.9, 
                  trend: 'down', 
                  feedback: 'Below market rates, insufficient benefits package' 
                },
                { 
                  category: 'Work-Life Balance', 
                  rating: 3.1, 
                  trend: 'stable', 
                  feedback: 'Long working hours, limited flexibility' 
                },
                { 
                  category: 'Career Growth', 
                  rating: 2.7, 
                  trend: 'down', 
                  feedback: 'Limited promotion opportunities, unclear career paths' 
                },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span 
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.rating >= 3.5 
                            ? 'bg-green-100 text-green-800' 
                            : item.rating >= 3.0 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.rating.toFixed(1)}/5.0
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.trend === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : item.trend === 'down' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.trend === 'up' ? '▲ Improving' : item.trend === 'down' ? '▼ Declining' : '► Stable'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.feedback}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}