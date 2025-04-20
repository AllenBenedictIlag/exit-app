'use client';

import { useState, useEffect } from 'react';
import ExitReasonsPieChart from '@/components/charts/ExitReasonsPieChart';
import DepartmentExitChart from '@/components/charts/DepartmentExitChart';
import TrendLineChart from '@/components/charts/TrendLineChart';
import ExitsByBusinessUnit from '@/components/charts/ExitsByBusinessUnit';
import RecommendationRatings from '@/components/charts/RecommendationRatings';
import WorkloadPerception from '@/components/charts/WorkloadPerception';
import CareerGrowthChart from '@/components/charts/CareerGrowthChart';
import PayRateChart from '@/components/charts/PayRateChart';
import BenefitsChart from '@/components/charts/BenefitsChart';
import { Download, Filter } from 'lucide-react';
import { getDataForPeriod } from '@/utils/dataGenerator';

// Map date ranges to time periods in the data generator
const dateRangeToPeriod = {
  'month': 'T128', // most recent period
  'quarter': 'T127', // current period
  'year': 'T126',   // previous period
  'custom': 'T125'  // older period
};

// Department mapping to ensure consistency
const departmentMapping: Record<string, string> = {
  'engineering': 'Engineering',
  'marketing': 'Marketing',
  'sales': 'Sales',
  'hr': 'HR',
  'operations': 'Operations',
  'finance': 'Finance',
  'it': 'IT'
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('quarter'); // Default to quarter to start with T127
  const [department, setDepartment] = useState('all');
  const [reportsData, setReportsData] = useState<any>(null);
  
  // Update data when date range changes
  useEffect(() => {
    // Get period based on date range selection
    const period = dateRangeToPeriod[dateRange as keyof typeof dateRangeToPeriod] || 'T127';
    const data = getDataForPeriod(period);
    setReportsData(data);
  }, [dateRange]);
  
  // Handle date range change
  const handleDateRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(e.target.value);
  };
  
  // Handle department change
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartment(e.target.value);
  };
  
  // Filter department exit data if a specific department is selected
  const getFilteredDepartmentData = () => {
    if (!reportsData || department === 'all') {
      return reportsData?.departmentExits || {};
    }
    
    const selectedDept = departmentMapping[department];
    if (!selectedDept || !reportsData.departmentExits[selectedDept]) {
      return reportsData.departmentExits;
    }
    
    // Return only the selected department
    return {
      [selectedDept]: reportsData.departmentExits[selectedDept]
    };
  };
  
  // Get data for the previous period to calculate change percentage
  const getPreviousPeriodData = () => {
    // Map current selection to the previous period
    const currentPeriod = dateRangeToPeriod[dateRange as keyof typeof dateRangeToPeriod] || 'T127';
    const periodNumbers: Record<string, number> = {
      'T128': 128,
      'T127': 127,
      'T126': 126,
      'T125': 125,
      'T124': 124,
      'T123': 123
    };
    
    const currentNumber = periodNumbers[currentPeriod] || 127;
    const previousPeriod = `T${currentNumber - 1}`;
    
    return getDataForPeriod(previousPeriod);
  };
  
  // Calculate exit rate and change percentage
  const calculateExitStats = () => {
    if (!reportsData) return { exits: 0, rate: 0, change: 0 };
    
    const previousData = getPreviousPeriodData();
    const currentExits = reportsData.exits || 0;
    const previousExits = previousData.exits || 0;
    
    // Calculate exit rate as percentage of total employees
    const exitRate = reportsData.totalEmployees 
      ? ((currentExits / reportsData.totalEmployees) * 100).toFixed(1) 
      : 0;
    
    // Calculate change percentage compared to previous period
    const changePercentage = previousExits 
      ? (((currentExits - previousExits) / previousExits) * 100).toFixed(1)
      : 0;
    
    return {
      exits: currentExits,
      rate: exitRate,
      change: changePercentage
    };
  };
  
  if (!reportsData) {
    return <div>Loading reports data...</div>;
  }
  
  const exitStats = calculateExitStats();
  
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
            onChange={handleDateRangeChange}
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
            onChange={handleDepartmentChange}
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
            {exitStats.exits}
            <span className={`text-sm font-normal ml-2 ${Number(exitStats.change) > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {Number(exitStats.change) > 0 ? '+' : ''}{exitStats.change}% vs previous period
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Exit rate: {exitStats.rate}% of total workforce
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <ExitReasonsPieChart data={reportsData.exitReasons} />
        </div>
        <div className="card p-6">
          <DepartmentExitChart data={getFilteredDepartmentData()} />
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

      {/* Employee Satisfaction Metrics Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Employee Satisfaction Metrics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <CareerGrowthChart />
          </div>
          <div className="card p-6">
            <PayRateChart />
          </div>
          <div className="card p-6">
            <BenefitsChart />
          </div>
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