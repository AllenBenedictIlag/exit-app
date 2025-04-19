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
import { TIME_PERIODS, getCurrentTimePeriod } from '@/utils/timeFrames';

export default function ReportsPage() {
  const [timePeriod, setTimePeriod] = useState<string>(getCurrentTimePeriod().id);
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
          <label htmlFor="time-period" className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select
            id="time-period"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {TIME_PERIODS.map(period => (
              <option key={period.id} value={period.id}>
                {period.name} ({period.description})
              </option>
            ))}
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
            {timePeriod === 'T125' ? 47 : 
             timePeriod === 'T126' ? 47 : 
             timePeriod === 'T127' ? 46 : 
             timePeriod === 'T128' ? 47 : 47}
            <span className="text-sm font-normal text-red-600 ml-2">
              {timePeriod === 'T125' ? '+5%' : 
               timePeriod === 'T126' ? '+3%' : 
               timePeriod === 'T127' ? '-2%' : 
               timePeriod === 'T128' ? '+4%' : '+6%'} vs previous period
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Exit rate: {
              timePeriod === 'T125' ? '7.8%' : 
              timePeriod === 'T126' ? '7.5%' : 
              timePeriod === 'T127' ? '7.3%' : 
              timePeriod === 'T128' ? '7.6%' : '8.2%'
            } of total workforce
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 shadow-sm rounded-lg bg-white">
          <ExitReasonsPieChart timePeriod={timePeriod} />
        </div>
        <div className="card p-6 shadow-sm rounded-lg bg-white">
          <DepartmentExitChart timePeriod={timePeriod} />
        </div>
      </div>
      
      <div className="pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6 shadow-sm rounded-lg bg-white">
            <CareerGrowthChart timePeriod={timePeriod} />
          </div>
          <div className="card p-6 shadow-sm rounded-lg bg-white">
            <PayRateChart timePeriod={timePeriod} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="card p-6 shadow-sm rounded-lg bg-white">
            <BenefitsChart timePeriod={timePeriod} />
          </div>
          <div className="card p-6 shadow-sm rounded-lg bg-white">
            <WorkloadPerception timePeriod={timePeriod} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6 shadow-sm rounded-lg bg-white">
          <ExitsByBusinessUnit timePeriod={timePeriod} />
        </div>
        <div className="card p-6 shadow-sm rounded-lg bg-white">
          <RecommendationRatings timePeriod={timePeriod} />
        </div>
      </div>

      <div className="card p-6 shadow-sm rounded-lg bg-white">
        <TrendLineChart />
      </div>
      
      <div className="card shadow-sm rounded-lg bg-white">
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
                  rating: timePeriod === 'T125' ? 3.4 :
                          timePeriod === 'T126' ? 3.5 :
                          timePeriod === 'T127' ? 3.6 :
                          timePeriod === 'T128' ? 3.7 : 3.8, 
                  trend: timePeriod === 'T129' ? 'up' : 
                         timePeriod === 'T128' ? 'up' : 'stable', 
                  feedback: 'Good team culture but office facilities need improvement' 
                },
                { 
                  category: 'Management', 
                  rating: timePeriod === 'T125' ? 2.9 :
                          timePeriod === 'T126' ? 3.0 :
                          timePeriod === 'T127' ? 3.1 :
                          timePeriod === 'T128' ? 3.1 : 3.2, 
                  trend: timePeriod === 'T129' ? 'up' : 
                         timePeriod === 'T128' ? 'stable' : 'down', 
                  feedback: 'Lack of clear communication from leadership' 
                },
                { 
                  category: 'Compensation', 
                  rating: timePeriod === 'T125' ? 2.5 :
                          timePeriod === 'T126' ? 2.6 :
                          timePeriod === 'T127' ? 2.7 :
                          timePeriod === 'T128' ? 2.8 : 2.9, 
                  trend: timePeriod === 'T125' ? 'down' : 
                         timePeriod === 'T126' ? 'down' : 
                         timePeriod === 'T127' ? 'stable' : 'up', 
                  feedback: 'Below market rates, insufficient benefits package' 
                },
                { 
                  category: 'Work-Life Balance', 
                  rating: timePeriod === 'T125' ? 2.8 :
                          timePeriod === 'T126' ? 2.9 :
                          timePeriod === 'T127' ? 3.0 :
                          timePeriod === 'T128' ? 3.0 : 3.1, 
                  trend: timePeriod === 'T125' ? 'down' : 
                         timePeriod === 'T126' ? 'stable' : 
                         timePeriod === 'T127' ? 'up' : 'stable', 
                  feedback: 'Long working hours, limited flexibility' 
                },
                { 
                  category: 'Career Growth', 
                  rating: timePeriod === 'T125' ? 2.3 :
                          timePeriod === 'T126' ? 2.4 :
                          timePeriod === 'T127' ? 2.5 :
                          timePeriod === 'T128' ? 2.6 : 2.7, 
                  trend: timePeriod === 'T125' ? 'down' : 
                         timePeriod === 'T126' ? 'down' : 
                         timePeriod === 'T127' ? 'stable' : 'up', 
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