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
}

export default function DepartmentExitChart({ data }: DepartmentExitChartProps) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);

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
            return `Exit count: ${value}`;
          }
        }
      }
    },
  };

  // Use the provided data or fallback to default
  const departmentData = data || {
    'CMAQA': 3, 
    'INDPRODDEPT': 3, 
    'CMACOM': 1, 
    'CMAPRODDEPT': 3, 
    'SAFETYSECURITY': 1, 
    'CORPENGDEPT': 1, 
    'EDLCPROD': 1, 
    'INDEQPTDEPT': 1, 
    'INDIEDEPT': 3, 
    'EDLCQACOM': 1, 
    'TESTENGDEPT': 2, 
    'HRD': 1
  };

  const chartData = {
    labels: Object.keys(departmentData),
    datasets: [
      {
        label: 'Exits by Department',
        data: Object.values(departmentData),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}