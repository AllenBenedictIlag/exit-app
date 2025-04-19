'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCareerGrowthData } from '@/services/exitDataService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CareerGrowthChart({ timePeriod = 'T129' }) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);

  // Get data from service
  useEffect(() => {
    const data = getCareerGrowthData(timePeriod);
    const dataArray = [
      data['Very good chance'] || 0,
      data['Good chances depending on performance'] || 0,
      data['Little chances but still hopeful'] || 0,
      data['Very little chances'] || 0
    ];
    setChartData(dataArray);
  }, [timePeriod]);

  // Chart.js options
  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let total = chartData.reduce((a: number, b: number) => a + b, 0);
            let percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${value} employees (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const labels = [
    'Very good chance', 
    'Good chances depending on performance', 
    'Little chances but still hopeful', 
    'Very little chances'
  ];

  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        borderRadius: 6,
        barPercentage: 0.8,
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
        <h3 className="text-lg font-medium">Career Growth Perception</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Career Growth Perception</h3>
      <p className="text-sm text-gray-500">How did you perceive your career growth opportunities?</p>
      <div className="mt-4 h-72" style={{ position: 'relative' }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
} 