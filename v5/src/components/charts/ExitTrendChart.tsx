'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

// Mock data
const data = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 8 },
  { month: 'Mar', count: 10 },
  { month: 'Apr', count: 15 },
  { month: 'May', count: 9 },
  { month: 'Jun', count: 11 },
  { month: 'Jul', count: 13 },
  { month: 'Aug', count: 7 },
  { month: 'Sep', count: 9 },
  { month: 'Oct', count: 16 },
  { month: 'Nov', count: 14 },
  { month: 'Dec', count: 10 },
];

const ExitTrendChart = () => {
  return (
    <div className="h-80 w-full">
      <h3 className="text-lg font-medium">Monthly Exit Trends</h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Exit Interviews" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExitTrendChart;