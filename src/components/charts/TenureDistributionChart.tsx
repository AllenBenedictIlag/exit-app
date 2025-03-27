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

export default function TenureDistributionChart() {
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
            return `${value} employees`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Employees'
        }
      }
    }
  };

  const labels = ['<1 year', '1-2 years', '2-3 years', '3-5 years', '5-7 years', '7-10 years', '>10 years'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Tenure Distribution',
        data: [12, 18, 15, 9, 6, 4, 2],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
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
        <h3 className="text-lg font-medium">Tenure Distribution of Exits</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Tenure Distribution of Exits</h3>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
} 