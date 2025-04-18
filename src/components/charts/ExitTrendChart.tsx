'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDataForPeriod } from '../../utils/dataGenerator';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExitTrendChartProps {
  period?: string;
}

export default function ExitTrendChart({ period = 'T127' }: ExitTrendChartProps) {
  // State to ensure client-side rendering only
  const [mounted, setMounted] = useState(false);

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: false,
      },
      subtitle: {
        display: false,
      },
      legend: {
        position: 'top' as const,
        align: 'center' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Exit Count',
          color: '#888'
        },
        min: 0,
        max: 12,
        ticks: {
          stepSize: 1,
          color: '#888'
        },
        grid: {
          display: true,
          color: '#eee',
          drawTicks: true
        }
      },
      x: {
        ticks: {
          color: '#888'
        },
        grid: {
          display: false
        }
      }
    },
  };

  // Generate comparison data based on selected period
  const generateComparisonData = () => {
    // Use period number to generate appropriate data
    const periodNum = parseInt(period.substring(1));
    
    // Create base data that will change with period
    // These values are scaled to match the chart in the screenshot but with more distinct variations
    const baseCurrentData = {
      'T123': [3, 7, 5],
      'T124': [4, 8, 6],
      'T125': [5, 9, 7],
      'T126': [6, 10, 8],
      'T127': [3, 11, 6], // The exact values from the screenshot
      'T128': [4, 12, 7]
    };
    
    // Previous period data will be about 70% of current period
    const basePreviousData = {
      'T123': [2, 5, 3],
      'T124': [3, 6, 4],
      'T125': [3, 7, 5],
      'T126': [4, 8, 5],
      'T127': [2, 8, 4], // The exact values from the screenshot
      'T128': [3, 9, 5]
    };
    
    return {
      current: baseCurrentData[period as keyof typeof baseCurrentData] || [3, 11, 6],
      previous: basePreviousData[period as keyof typeof basePreviousData] || [2, 8, 4]
    };
  };

  const comparisonData = generateComparisonData();
  const periodLabels = ['May 2023', 'June 2023', 'July 2023'];

  const chartData = {
    labels: periodLabels,
    datasets: [
      {
        label: 'Current Year',
        data: comparisonData.current,
        borderColor: '#4285F4', // Google blue color
        backgroundColor: 'rgba(66, 133, 244, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#4285F4',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 1,
        pointBorderColor: '#ffffff'
      },
      {
        label: 'Previous Year (Estimated)',
        data: comparisonData.previous,
        borderColor: '#EA4335', // Google red color
        backgroundColor: 'rgba(234, 67, 53, 0.5)',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#EA4335',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 1,
        pointBorderColor: '#ffffff'
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
        <h3 className="text-lg font-medium">Exit Trends Comparison</h3>
        <div className="mt-4 h-80 flex items-center justify-center bg-gray-50 rounded">
          <p className="text-gray-400">Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium">Exit Trends Comparison</h3>
      <div className="mt-4 h-80" style={{ position: 'relative' }}>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}