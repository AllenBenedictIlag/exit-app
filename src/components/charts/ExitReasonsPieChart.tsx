'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getExitReasonsByPeriod } from '@/services/exitDataService';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ExitReasonsPieChartProps {
  data?: Record<string, number>;
  timePeriod?: string;
}

export default function ExitReasonsPieChart({ data, timePeriod = 'T129' }: ExitReasonsPieChartProps) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);
  const [exitReasons, setExitReasons] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Use provided data or fetch from API
  useEffect(() => {
    async function fetchExitReasons() {
      try {
        setIsLoading(true);
        // If data prop is provided, use it
        if (data) {
          setExitReasons(data);
        } 
        // If timePeriod is provided, get data from service
        else if (timePeriod) {
          const reasonsData = getExitReasonsByPeriod(timePeriod);
          setExitReasons(reasonsData);
        }
        // Otherwise fetch from API (fallback)
        else {
          // Fetch exit reasons from our API
          const response = await fetch('/api/exit-data?type=reasons');
          
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          
          const result = await response.json();
          
          if (result.success && result.data) {
            // Transform API response to chart format
            const reasonsData: Record<string, number> = {};
            result.data.forEach((item: any) => {
              reasonsData[item.reason] = item.count;
            });
            
            setExitReasons(reasonsData);
          }
        }
      } catch (error) {
        console.error('Error fetching exit reasons:', error);
        // Fallback to default data if needed
        setExitReasons({
          'Another Job (Abroad)': 5,
          'Differences with Co-Employees': 5,
          'Personal/Family Reasons': 3,
          'Health': 2,
          'Differences with Superior': 1,
          'Continue to Study': 1,
          'Business': 1,
          'Practice Profession': 1,
          'Dislike Company Procedure': 1
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    if (mounted) {
      fetchExitReasons();
    }
  }, [mounted, data, timePeriod]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate colors for the chart
  const generateColors = (count: number) => {
    const colors = [
      '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9146FF',
      '#8884d8', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57',
      '#83a6ed', '#8dd1e1', '#b6a2de', '#6ab975', '#ff9f86'
    ];
    
    return Array(count).fill(0).map((_, i) => colors[i % colors.length]);
  };

  const labels = Object.keys(exitReasons);
  const values = Object.values(exitReasons);
  const backgroundColors = generateColors(labels.length);

  // Data for exit reasons
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        padding: 25,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = values.reduce((sum, val) => sum + val, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} employees (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: {
        bottom: 20
      }
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="h-96 w-full">
        <h3 className="text-lg font-medium">Top Exit Reasons</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-96 w-full">
      <h3 className="text-lg font-medium">Top Exit Reasons</h3>
      <p className="text-sm text-gray-500">Primary reasons employees cite for leaving</p>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}