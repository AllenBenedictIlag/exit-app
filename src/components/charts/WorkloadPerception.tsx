'use client';

import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for workload perception
const data = [
  { subject: 'Too Heavy', A: 70, B: 55, fullMark: 100 },
  { subject: 'Somewhat Heavy', A: 85, B: 65, fullMark: 100 },
  { subject: 'Just Right', A: 50, B: 78, fullMark: 100 },
  { subject: 'Somewhat Light', A: 25, B: 40, fullMark: 100 },
  { subject: 'Too Light', A: 10, B: 15, fullMark: 100 },
];

const WorkloadPerception = () => {
  return (
    <div className="h-80 w-full">
      <h3 className="text-lg font-medium mb-2">Perception of Workload</h3>
      <p className="text-sm text-gray-500 mb-4">
        Employees' thoughts about the amount of work at Company Corp
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            cx="50%" 
            cy="50%" 
            outerRadius="70%" 
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Tooltip 
              contentStyle={{ fontSize: '12px' }}
              formatter={(value) => [`${value}%`, '']}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}
              align="center"
              verticalAlign="bottom"
            />
            <Radar
              name="Previous Year"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.5}
            />
            <Radar
              name="Current Year"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkloadPerception; 