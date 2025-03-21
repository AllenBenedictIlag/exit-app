'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';

// Mock data for exits by Business Unit
const data = [
  { businessUnit: 'Corporate Services', count: 28 },
  { businessUnit: 'Technology', count: 32 },
  { businessUnit: 'Operations', count: 24 },
  { businessUnit: 'Finance', count: 17 },
  { businessUnit: 'Sales & Marketing', count: 21 },
  { businessUnit: 'Human Resources', count: 9 },
  { businessUnit: 'Customer Support', count: 15 }
];

const ExitsByBusinessUnit = () => {
  return (
    <div className="h-80 w-full">
      <h3 className="text-lg font-medium mb-2">Exits by Business Unit</h3>
      <p className="text-sm text-gray-500 mb-4">Number of exit interviews conducted per business unit</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 60,
            }}
            barSize={36}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="businessUnit" 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickCount={6}
              domain={[0, 'auto']}
            />
            <Tooltip 
              contentStyle={{ fontSize: '12px', borderRadius: '4px' }} 
              formatter={(value, name, props) => [`${value} interviews`, props.payload.businessUnit]}
              labelFormatter={() => ''}
            />
            <Bar 
              dataKey="count" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]}
            >
              <LabelList 
                dataKey="count" 
                position="top" 
                fill="#666" 
                fontSize={11} 
                offset={5}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExitsByBusinessUnit; 