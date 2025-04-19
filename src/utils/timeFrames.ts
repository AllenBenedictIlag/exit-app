/**
 * Time period definitions for exit interview data
 * 234 samples from 2023-05-30 to 2024-07-09 divided into 5 periods
 */

export interface TimePeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const TIME_PERIODS: TimePeriod[] = [
  {
    id: 'T125',
    name: 'Period T125',
    startDate: '2023-05-30',
    endDate: '2023-08-19',
    description: 'Q2-Q3 2023'
  },
  {
    id: 'T126',
    name: 'Period T126',
    startDate: '2023-08-20',
    endDate: '2023-11-09',
    description: 'Q3-Q4 2023'
  },
  {
    id: 'T127',
    name: 'Period T127',
    startDate: '2023-11-10',
    endDate: '2024-01-29',
    description: 'Q4 2023-Q1 2024'
  },
  {
    id: 'T128',
    name: 'Period T128',
    startDate: '2024-01-30',
    endDate: '2024-04-19',
    description: 'Q1-Q2 2024'
  },
  {
    id: 'T129',
    name: 'Period T129',
    startDate: '2024-04-20',
    endDate: '2024-07-09',
    description: 'Q2-Q3 2024'
  }
];

/**
 * Get the time period for a given date
 */
export const getTimePeriodForDate = (date: Date): TimePeriod | undefined => {
  const dateStr = date.toISOString().split('T')[0];
  return TIME_PERIODS.find(
    period => dateStr >= period.startDate && dateStr <= period.endDate
  );
};

/**
 * Get a time period by ID
 */
export const getTimePeriodById = (id: string): TimePeriod | undefined => {
  return TIME_PERIODS.find(period => period.id === id);
};

/**
 * Get the current time period based on today's date
 */
export const getCurrentTimePeriod = (): TimePeriod => {
  const today = new Date();
  const period = getTimePeriodForDate(today);
  // If today is beyond our defined periods, return the last period
  return period || TIME_PERIODS[TIME_PERIODS.length - 1];
};

/**
 * Distribution of samples per time period (based on 234 total samples)
 * Calculated approximately proportional to period length
 */
export const SAMPLES_PER_PERIOD = {
  'T125': 47,
  'T126': 47,
  'T127': 46,
  'T128': 47,
  'T129': 47
}; 