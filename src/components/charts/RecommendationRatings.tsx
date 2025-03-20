'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

// Mock data for recommendation ratings
const data = [
  { rating: 'Definitely Yes', count: 32, percentage: 21 },
  { rating: 'Probably Yes', count: 48, percentage: 32 },
  { rating: 'Not Sure', count: 27, percentage: 18 },
  { rating: 'Probably Not', count: 25, percentage: 17 },
  { rating: 'Definitely Not', count: 18, percentage: 12 }
];

// Custom colors for the different ratings
const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];

const RecommendationRatings = () => {
  return (
    <div className="h-80 w-full">
      <h3 className="text-lg font-medium mb-2">Would You Recommend Company Corp to a Friend?</h3>
      <p className="text-sm text-gray-500 mb-4">Distribution of employee recommendations in exit interviews</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            layout="vertical"
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tick={{ fontSize: 12 }}
              domain={[0, 'dataMax + 5']}
            />
            <YAxis 
              dataKey="rating" 
              type="category" 
              width={110} 
              tick={{ fontSize: 12 }}
              tickMargin={5}
            />
            <Tooltip 
              formatter={(value, name) => [value + '%', name === 'percentage' ? 'Percentage' : 'Count']}
              contentStyle={{ fontSize: '12px' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}
            />
            <Bar 
              dataKey="percentage" 
              name="Percentage (%)" 
              radius={[0, 4, 4, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <LabelList 
                dataKey="percentage" 
                position="right" 
                formatter={(value) => `${value}%`}
                style={{ fontSize: '11px', fill: '#666' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RecommendationRatings; 