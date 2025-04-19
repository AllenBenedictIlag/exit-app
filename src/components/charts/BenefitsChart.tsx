'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { getBenefitsData } from '@/services/exitDataService';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function BenefitsChart({ timePeriod = 'T129' }) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);

  // Get data from service
  useEffect(() => {
    const data = getBenefitsData(timePeriod);
    const dataArray = [
      data['Very adequate'] || 0,
      data['Adequate'] || 0,
      data['Inadequate'] || 0
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
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          display: false
        },
        beginAtZero: true
      }
    }
  };

  const data = {
    labels: ['Very adequate', 'Adequate', 'Inadequate'],
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
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
        <h3 className="text-lg font-medium">Benefits Satisfaction</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Benefits Satisfaction</h3>
      <p className="text-sm text-gray-500">How did you feel about the benefits package?</p>
      <div className="mt-4 h-72" style={{ position: 'relative' }}>
        <PolarArea options={options} data={data} />
      </div>
    </div>
  );
} 