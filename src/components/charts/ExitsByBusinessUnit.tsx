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

export default function ExitsByBusinessUnit() {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);

  // Chart.js options
  const options = {
    indexAxis: 'y' as const,
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

  // Data from the provided exit interviews
  const businessUnits = ['BU1', 'BU2', 'BU3', 'BU4'];
  const exitCounts = [10, 3, 6, 2];

  const data = {
    labels: businessUnits,
    datasets: [
      {
        label: 'Exits by Business Unit',
        data: exitCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        <h3 className="text-lg font-medium">Exits by Business Unit</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Exits by Business Unit</h3>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
} 