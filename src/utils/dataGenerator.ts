// Baseline metrics that will be adjusted per time period
const baselineMetrics = {
  T127: { // Using T127 as baseline since it seems to be the current selection
    totalEmployees: 1284,
    newHires: 24,
    exits: 18,
    pendingInterviews: 7,
    // Add data points for your graphs
    departmentExits: {
      'Engineering': 5,
      'Sales': 4,
      'Marketing': 3,
      'HR': 2,
      'Finance': 2,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 7,
      'Relocation': 4,
      'Work-Life Balance': 3,
      'Career Growth': 2,
      'Compensation': 1,
      'Management Issues': 1
    },
    // Add more graph data as needed
    monthlyTrends: [12, 15, 10, 14, 18, 22, 16, 19, 21, 18, 16, 18],
    satisfactionRatings: {
      'Very Satisfied': 20,
      'Satisfied': 35,
      'Neutral': 25,
      'Dissatisfied': 15,
      'Very Dissatisfied': 5
    }
  }
};

// Variance factors for each time period compared to T127
const periodVariances = {
  T123: { 
    employeesFactor: 0.85, // 15% fewer employees than T127
    hiresExitsFactor: 0.7, // 30% fewer hires/exits
    interviewsFactor: 0.6, // 40% fewer interviews
    trendDirection: -1 // Downward trend in graphs
  },
  T124: { 
    employeesFactor: 0.9,
    hiresExitsFactor: 0.8,
    interviewsFactor: 0.7,
    trendDirection: -0.5
  },
  T125: { 
    employeesFactor: 0.95,
    hiresExitsFactor: 0.9,
    interviewsFactor: 0.85,
    trendDirection: 0
  },
  T126: { 
    employeesFactor: 0.98,
    hiresExitsFactor: 0.95,
    interviewsFactor: 0.9,
    trendDirection: 0.5
  },
  T127: { 
    employeesFactor: 1, // Current period (baseline)
    hiresExitsFactor: 1,
    interviewsFactor: 1,
    trendDirection: 1
  },
  T128: { 
    employeesFactor: 1.03, // Projected 3% growth
    hiresExitsFactor: 1.1,
    interviewsFactor: 1.2,
    trendDirection: 1.5 // Upward trend in graphs
  }
};

// Generate variation of a number based on factor and some randomness
const generateVariation = (baseValue: number, factor: number): number => {
  const randomVariance = Math.random() * 0.1 - 0.05; // ±5% random variation
  return Math.round(baseValue * (factor + randomVariance));
};

// Apply variations to categorical data (like departmentExits)
const applyCategoricalVariation = (
  baseData: Record<string, number>, 
  factor: number, 
  direction: number
): Record<string, number> => {
  const result: Record<string, number> = {};
  
  for (const [key, value] of Object.entries(baseData)) {
    // Apply the general factor plus some direction-based variation
    const newValue = Math.round(value * (factor + (direction * 0.1 * Math.random())));
    result[key] = Math.max(0, newValue); // Ensure non-negative values
  }
  
  return result;
};

// Data for each time period with variations
const periodData = {
  'T123': {
    totalEmployees: 1012,
    newHires: 15,
    exits: 12,
    pendingInterviews: 4,
    departmentExits: {
      'Engineering': 3,
      'Sales': 3,
      'Marketing': 2,
      'HR': 1,
      'Finance': 2,
      'Operations': 1
    },
    exitReasons: {
      'Better Opportunity': 5,
      'Relocation': 2,
      'Work-Life Balance': 2,
      'Career Growth': 1,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [9, 11, 8, 10, 12, 15, 13, 11, 14, 12, 10, 12]
  },
  'T124': {
    totalEmployees: 1089,
    newHires: 18,
    exits: 14,
    pendingInterviews: 5,
    departmentExits: {
      'Engineering': 4,
      'Sales': 3,
      'Marketing': 2,
      'HR': 2,
      'Finance': 1,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 6,
      'Relocation': 3,
      'Work-Life Balance': 2,
      'Career Growth': 1,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [10, 12, 9, 11, 14, 17, 14, 13, 16, 14, 12, 14]
  },
  'T125': {
    totalEmployees: 1156,
    newHires: 20,
    exits: 15,
    pendingInterviews: 5,
    departmentExits: {
      'Engineering': 4,
      'Sales': 4,
      'Marketing': 2,
      'HR': 2,
      'Finance': 1,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 6,
      'Relocation': 3,
      'Work-Life Balance': 3,
      'Career Growth': 1,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [11, 13, 10, 12, 15, 18, 15, 16, 18, 15, 14, 15]
  },
  'T126': {
    totalEmployees: 1227,
    newHires: 22,
    exits: 16,
    pendingInterviews: 6,
    departmentExits: {
      'Engineering': 5,
      'Sales': 4,
      'Marketing': 2,
      'HR': 2,
      'Finance': 1,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 6,
      'Relocation': 4,
      'Work-Life Balance': 3,
      'Career Growth': 1,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [11, 14, 10, 13, 17, 20, 15, 18, 19, 17, 15, 16]
  },
  'T127': {
    totalEmployees: 1284,
    newHires: 24,
    exits: 18,
    pendingInterviews: 7,
    departmentExits: {
      'Engineering': 5,
      'Sales': 4,
      'Marketing': 3,
      'HR': 2,
      'Finance': 2,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 7,
      'Relocation': 4,
      'Work-Life Balance': 3,
      'Career Growth': 2,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [12, 15, 10, 14, 18, 22, 16, 19, 21, 18, 16, 18],
    satisfactionRatings: {
      'Very Satisfied': 20,
      'Satisfied': 35,
      'Neutral': 25,
      'Dissatisfied': 15,
      'Very Dissatisfied': 5
    }
  },
  'T128': {
    totalEmployees: 1328,
    newHires: 26,
    exits: 19,
    pendingInterviews: 8,
    departmentExits: {
      'Engineering': 6,
      'Sales': 4,
      'Marketing': 3,
      'HR': 2,
      'Finance': 2,
      'Operations': 2
    },
    exitReasons: {
      'Better Opportunity': 8,
      'Relocation': 4,
      'Work-Life Balance': 3,
      'Career Growth': 2,
      'Compensation': 1,
      'Management Issues': 1
    },
    monthlyTrends: [13, 16, 11, 15, 19, 24, 18, 21, 23, 20, 17, 19]
  }
};

// Function to get data for a specific time period
export const getDataForPeriod = (period: string) => {
  return periodData[period as keyof typeof periodData] || periodData['T127']; // Default to T127 if period not found
};

// Keeping the old function for backward compatibility
export const generateDataForTimePeriod = (period: string) => {
  return getDataForPeriod(period);
}; 