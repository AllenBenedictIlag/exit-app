'use client';

import { useState } from 'react';
import ExitTrendChart from '@/components/charts/ExitTrendChart';
import ExitReasonsPieChart from '@/components/charts/ExitReasonsPieChart';
import { UserPlus, Users, UserMinus, Calendar } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }: { 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  color: string 
}) => {
  return (
    <div className="card flex items-center">
      <div className={`p-3 rounded-full ${color} mr-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('T128');
  
  // Time period mapping object - for display purposes
  const timePeriodLabels = {
    'T123': 'April 2020 - 2021',
    'T124': 'April 2021 - 2022',
    'T125': 'April 2022 - 2023',
    'T126': 'April 2023 - 2024',
    'T127': 'April 2024 - 2025',
    'T128': 'April 2025 - 2026',
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="flex items-center">
          <div className="w-48">
            <select
              id="time-period"
              className="block w-full rounded-md border-gray-300 shadow-sm hover:border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200 text-gray-700 sm:text-sm"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              style={{ outline: 'none' }}
            >
              <option value="T123">T123</option>
              <option value="T124">T124</option>
              <option value="T125">T125</option>
              <option value="T126">T126</option>
              <option value="T127">T127</option>
              <option value="T128">T128</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Employees" 
          value="1,284" 
          icon={Users} 
          color="bg-blue-500" 
        />
        <StatCard 
          title="New Hires (This Month)" 
          value="24" 
          icon={UserPlus} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Exits (This Month)" 
          value="18" 
          icon={UserMinus} 
          color="bg-red-500" 
        />
        <StatCard 
          title="Pending Exit Interviews" 
          value="7" 
          icon={Calendar} 
          color="bg-amber-500" 
        />
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <ExitTrendChart />
        </div>
        <div className="card">
          <ExitReasonsPieChart />
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Recent Exit Interviews</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exit Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">Employee Name {item}</div>
                    <div className="text-sm text-gray-500">ID: EMP-{10000 + item}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {['Engineering', 'Marketing', 'HR', 'Sales', 'Operations'][item - 1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {`2025-${(item % 3) + 1}-${item * 5}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item % 3 === 0 
                        ? 'bg-green-100 text-green-800' 
                        : item % 3 === 1 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item % 3 === 0 ? 'Completed' : item % 3 === 1 ? 'Pending' : 'In Progress'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-4">
                      View
                    </a>
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