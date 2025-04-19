'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getPayRateData } from '@/services/exitDataService';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function PayRateChart({ timePeriod = 'T129' }) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);

  // Get data from service
  useEffect(() => {
    const data = getPayRateData(timePeriod);
    const dataArray = [
      data['Very compensating'] || 0,
      data['Fair Enough'] || 0,
      data['A bit low although acceptable'] || 0,
      data['Very low'] || 0,
      data['Not commensurate to job/load'] || 0
    ];
    setChartData(dataArray);
  }, [timePeriod]);

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          boxWidth: 12,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: function(context: any) {
            let label = context.label || '';
            let value = context.raw || 0;
            let total = chartData.reduce((a: number, b: number) => a + b, 0);
            let percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} employees (${percentage}%)`;
          }
        }
      }
    }
  };

  const labels = [
    'Very compensating', 
    'Fair Enough', 
    'A bit low although acceptable', 
    'Very low', 
    'Not commensurate to job/load'
  ];

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',  // Blue - Very compensating
          'rgba(75, 192, 192, 0.7)',  // Teal - Fair Enough
          'rgba(255, 206, 86, 0.7)',  // Yellow - A bit low
          'rgba(255, 99, 132, 0.7)',  // Red - Very low
          'rgba(153, 102, 255, 0.7)', // Purple - Not commensurate
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 10,
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
        <h3 className="text-lg font-medium">Pay Rate Satisfaction</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Pay Rate Satisfaction</h3>
      <p className="text-sm text-gray-500">How did you feel about your compensation?</p>
      <div className="mt-4 h-72" style={{ position: 'relative' }}>
        <Pie options={options} data={data} />
      </div>
    </div>
  );
} 