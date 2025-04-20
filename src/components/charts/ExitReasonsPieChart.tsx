'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ExitReasonsPieChartProps {
  data?: Record<string, number>;
}

export default function ExitReasonsPieChart({ data }: ExitReasonsPieChartProps) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);

  // Use provided data or fallback to default
  const exitReasons = data || {
    'Another Job (Abroad)': 5,
    'Differences with Co-Employees': 5,
    'Personal/Family Reasons': 3,
    'Health': 2,
    'Differences with Superior': 1,
    'Continue to Study': 1,
    'Business': 1,
    'Practice Profession': 1,
    'Dislike Company Procedure': 1
  };

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
        borderColor: 'white',
        borderWidth: 2,
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
        labels: {
          padding: 30, // Add more padding between legend items
          boxWidth: 15, // Make legend color boxes smaller
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} employees`;
          }
        }
      }
    },
    layout: {
      padding: {
        bottom: -10 // Add padding at the bottom of the chart
      }
    }
  };

  // Use effect to ensure client-side rendering only
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}