'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data
const data = [
  { department: 'Engineering', count: 24, percentage: 8.5 },
  { department: 'Sales', count: 18, percentage: 10.2 },
  { department: 'Marketing', count: 12, percentage: 9.8 },
  { department: 'Human Resources', count: 5, percentage: 7.5 },
  { department: 'Finance', count: 9, percentage: 6.2 },
  { department: 'Operations', count: 15, percentage: 11.3 },
  { department: 'IT', count: 8, percentage: 5.9 },
];

const DepartmentExitChart = () => {
  return (
    <div className="h-96 w-full">
      <h3 className="text-lg font-medium mb-2">Exits by Department</h3>
      <div className="mt-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" name="Number of Exits" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="percentage" name="Exit Rate (%)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepartmentExitChart;