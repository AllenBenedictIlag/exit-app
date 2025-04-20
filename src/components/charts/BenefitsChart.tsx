'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function BenefitsChart() {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          boxWidth: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            let value = context.raw || 0;
            let total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            let percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    layout: {
      padding: {
        bottom: 10
      }
    }
  };

  // Sample data for benefits perception
  const data = {
    labels: [
      'Very adequate', 
      'Adequate', 
      'Inadequate'
    ],
    datasets: [
      {
        data: [18, 35, 17],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  // Use effect to ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium">Benefits Assessment</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Benefits Assessment</h3>
      <p className="text-sm text-gray-500">How did exiting employees rate their benefits package?</p>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
} 