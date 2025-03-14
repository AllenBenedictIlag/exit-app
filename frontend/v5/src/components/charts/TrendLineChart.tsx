'use client';

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data
const data = [
  { month: 'Jan', thisYear: 8, lastYear: 5 },
  { month: 'Feb', thisYear: 12, lastYear: 7 },
  { month: 'Mar', thisYear: 10, lastYear: 11 },
  { month: 'Apr', thisYear: 15, lastYear: 9 },
  { month: 'May', thisYear: 18, lastYear: 12 },
  { month: 'Jun', thisYear: 14, lastYear: 10 },
  { month: 'Jul', thisYear: 16, lastYear: 15 },
  { month: 'Aug', thisYear: 9, lastYear: 13 },
  { month: 'Sep', thisYear: 11, lastYear: 8 },
  { month: 'Oct', thisYear: 14, lastYear: 12 },
  { month: 'Nov', thisYear: 17, lastYear: 11 },
  { month: 'Dec', thisYear: 13, lastYear: 9 },
];

const TrendLineChart = () => {
  return (
    <div className="h-96 w-full">
      <h3 className="text-lg font-medium mb-2">Exit Trends - Year Comparison</h3>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Line
              type="monotone"
              dataKey="thisYear"
              name="Current Year"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="lastYear" 
              name="Previous Year" 
              stroke="#82ca9d" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendLineChart;