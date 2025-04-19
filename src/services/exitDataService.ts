import { TIME_PERIODS, TimePeriod, SAMPLES_PER_PERIOD } from '@/utils/timeFrames';

interface ExitReason {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

// Define the exit reasons with reasonable distribution percentages
const EXIT_REASONS: ExitReason[] = [
  { id: 'better_opportunity', name: 'Better Opportunity' },
  { id: 'career_growth', name: 'Career Growth' },
  { id: 'compensation', name: 'Compensation' },
  { id: 'work_life_balance', name: 'Work-Life Balance' },
  { id: 'management', name: 'Management Issues' },
  { id: 'relocation', name: 'Relocation' },
  { id: 'company_culture', name: 'Company Culture' },
  { id: 'job_fit', name: 'Job Fit' }
];

// Define departments
const DEPARTMENTS: Department[] = [
  { id: 'engineering', name: 'Engineering' },
  { id: 'sales', name: 'Sales' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'operations', name: 'Operations' },
  { id: 'finance', name: 'Finance' },
  { id: 'it', name: 'IT' }
];

// Define career growth options from the chart
const CAREER_GROWTH_OPTIONS = [
  'Very good chance',
  'Good chances depending on performance',
  'Little chances but still hopeful',
  'Very little chances'
];

// Define pay rate satisfaction options from the chart
const PAY_RATE_OPTIONS = [
  'Very compensating',
  'Fair Enough',
  'A bit low although acceptable',
  'Very low',
  'Not commensurate to job/load'
];

// Define benefits satisfaction options from the chart
const BENEFITS_OPTIONS = [
  'Very adequate',
  'Adequate',
  'Inadequate'
];

// Define workload perception options from the chart
const WORKLOAD_OPTIONS = [
  'Too much work',
  'Just enough load',
  'Minimal work'
];

interface ExitInterviewData {
  id: string;
  employeeId: string;
  exitDate: string;
  timePeriod: string;
  department: string;
  reason: string;
  careerGrowth: string;
  payRate: string;
  benefits: string;
  workload: string;
}

// Generate random data for each time period
const generateExitData = (): ExitInterviewData[] => {
  const allData: ExitInterviewData[] = [];
  
  TIME_PERIODS.forEach(period => {
    const sampleCount = SAMPLES_PER_PERIOD[period.id as keyof typeof SAMPLES_PER_PERIOD];
    
    for (let i = 0; i < sampleCount; i++) {
      // Generate random date within the period
      const startDate = new Date(period.startDate);
      const endDate = new Date(period.endDate);
      const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
      
      // Generate data with biased distributions for each time period
      const exitData: ExitInterviewData = {
        id: `${period.id}-${i + 1}`,
        employeeId: `EMP-${Math.floor(100000 + Math.random() * 900000)}`,
        exitDate: randomDate.toISOString().split('T')[0],
        timePeriod: period.id,
        department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)].name,
        reason: EXIT_REASONS[Math.floor(Math.random() * EXIT_REASONS.length)].name,
        careerGrowth: getWeightedRandomChoice(CAREER_GROWTH_OPTIONS, getCareerGrowthWeights(period)),
        payRate: getWeightedRandomChoice(PAY_RATE_OPTIONS, getPayRateWeights(period)),
        benefits: getWeightedRandomChoice(BENEFITS_OPTIONS, getBenefitsWeights(period)),
        workload: getWeightedRandomChoice(WORKLOAD_OPTIONS, getWorkloadWeights(period))
      };
      
      allData.push(exitData);
    }
  });
  
  return allData;
};

// Helper function to get a weighted random choice
const getWeightedRandomChoice = (options: string[], weights: number[]): string => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < options.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return options[i];
    }
  }
  
  return options[0]; // Fallback
};

// Weight functions for each metric
// These create different distributions for different time periods to show trends
const getCareerGrowthWeights = (period: TimePeriod): number[] => {
  switch (period.id) {
    case 'T125': return [15, 35, 35, 15]; // Balanced
    case 'T126': return [20, 35, 30, 15]; // Slightly improved
    case 'T127': return [25, 40, 25, 10]; // Better
    case 'T128': return [30, 40, 20, 10]; // Good
    case 'T129': return [35, 45, 15, 5];  // Very good
    default: return [25, 35, 25, 15];     // Default balanced
  }
};

const getPayRateWeights = (period: TimePeriod): number[] => {
  switch (period.id) {
    case 'T125': return [15, 25, 30, 20, 10]; // Lower satisfaction
    case 'T126': return [15, 30, 30, 15, 10]; 
    case 'T127': return [20, 35, 25, 15, 5];  
    case 'T128': return [25, 40, 20, 10, 5];  
    case 'T129': return [30, 40, 20, 5, 5];   // Higher satisfaction
    default: return [20, 35, 25, 15, 5];      // Default
  }
};

const getBenefitsWeights = (period: TimePeriod): number[] => {
  switch (period.id) {
    case 'T125': return [20, 50, 30]; // More inadequate
    case 'T126': return [25, 50, 25];
    case 'T127': return [30, 50, 20];
    case 'T128': return [35, 50, 15];
    case 'T129': return [40, 50, 10]; // Less inadequate
    default: return [30, 50, 20];     // Default
  }
};

const getWorkloadWeights = (period: TimePeriod): number[] => {
  switch (period.id) {
    case 'T125': return [45, 35, 20]; // More "too much"
    case 'T126': return [40, 40, 20];
    case 'T127': return [35, 45, 20];
    case 'T128': return [30, 50, 20];
    case 'T129': return [25, 55, 20]; // More balanced
    default: return [35, 45, 20];     // Default
  }
};

// Generate all data once
const allExitData = generateExitData();

// Service functions to access data
export const getExitDataByPeriod = (periodId: string): ExitInterviewData[] => {
  return allExitData.filter(data => data.timePeriod === periodId);
};

export const getAllExitData = (): ExitInterviewData[] => {
  return allExitData;
};

// Get aggregated data for charts
export const getCareerGrowthData = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return CAREER_GROWTH_OPTIONS.reduce((acc, option) => {
    acc[option] = periodData.filter(data => data.careerGrowth === option).length;
    return acc;
  }, {} as { [key: string]: number });
};

export const getPayRateData = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return PAY_RATE_OPTIONS.reduce((acc, option) => {
    acc[option] = periodData.filter(data => data.payRate === option).length;
    return acc;
  }, {} as { [key: string]: number });
};

export const getBenefitsData = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return BENEFITS_OPTIONS.reduce((acc, option) => {
    acc[option] = periodData.filter(data => data.benefits === option).length;
    return acc;
  }, {} as { [key: string]: number });
};

export const getWorkloadData = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return WORKLOAD_OPTIONS.reduce((acc, option) => {
    acc[option] = periodData.filter(data => data.workload === option).length;
    return acc;
  }, {} as { [key: string]: number });
};

export const getExitReasonsByPeriod = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return EXIT_REASONS.reduce((acc, reason) => {
    acc[reason.name] = periodData.filter(data => data.reason === reason.name).length;
    return acc;
  }, {} as { [key: string]: number });
};

export const getDepartmentExitsByPeriod = (periodId: string): { [key: string]: number } => {
  const periodData = getExitDataByPeriod(periodId);
  return DEPARTMENTS.reduce((acc, dept) => {
    acc[dept.name] = periodData.filter(data => data.department === dept.name).length;
    return acc;
  }, {} as { [key: string]: number });
}; 