'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDepartmentExitsByPeriod } from '@/services/exitDataService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentExitChartProps {
  data?: Record<string, number>;
  timePeriod?: string;
}

export default function DepartmentExitChart({ data, timePeriod = 'T129' }: DepartmentExitChartProps) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);
  const [departmentData, setDepartmentData] = useState<Record<string, number>>({});

  useEffect(() => {
    if (mounted) {
      if (data) {
        setDepartmentData(data);
      } else if (timePeriod) {
        const deptData = getDepartmentExitsByPeriod(timePeriod);
        setDepartmentData(deptData);
      } else {
        // Fallback to default
        setDepartmentData({
          'Engineering': 5,
          'Sales': 4,
          'Marketing': 3,
          'Human Resources': 2,
          'Operations': 3,
          'Finance': 2,
          'IT': 3
        });
      }
    }
  }, [mounted, data, timePeriod]);

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let value = context.raw || 0;
            const total = Object.values(departmentData).reduce((sum, val) => sum + val, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `Exits: ${value} (${percentage}% of total)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const chartData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: 'Exits by Department',
        data: Object.values(departmentData),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1
      }
    ],
  };

  // Use effect to ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium">Exits by Department</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Exits by Department</h3>
      <p className="text-sm text-gray-500">Distribution of exits across company departments</p>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}