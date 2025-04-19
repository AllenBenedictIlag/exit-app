import pool from '../utils/db';

interface ExitInterview {
  Control_Number: string;
  Date_of_Exit_Interview: Date;
  Month_of_Exit_Interview: string;
  Employee_Number: string;
  Employee_Name: string;
  BU: string;
  DEPT: string;
  Intermediate_Supervisor: string;
  Date_of_Resignation: Date;
  Reason_for_Leaving: string;
  Reason_Comments: string;
  Reason_Job_Business_Why: string;
  Why_Comments: string;
  Growth: string;
  Growth_Comments: string;
  Pay_Rate: string;
  Pay_Comments: string;
  Benefits: string;
  Benefits_Comments: string;
  Amount_of_Work: string;
  Amount_Comments: string;
  Recommend: string;
  Recommend_Comments: string;
  Suggestion_To_Improve: string;
  DPA_Consent: string;
}

// Get all exit interviews
export async function getAllExitInterviews() {
  try {
    const [rows] = await pool.query('SELECT * FROM `exit-app`');
    return rows as ExitInterview[];
  } catch (error) {
    console.error('Error fetching exit interviews:', error);
    throw error;
  }
}

// Get exit interviews by month
export async function getExitInterviewsByMonth(month: string) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `exit-app` WHERE Month_of_Exit_Interview = ?',
      [month]
    );
    return rows as ExitInterview[];
  } catch (error) {
    console.error('Error fetching exit interviews by month:', error);
    throw error;
  }
}

// Get exit reasons summary (count by reason)
export async function getExitReasonsSummary() {
  try {
    const [rows] = await pool.query(
      'SELECT Reason_for_Leaving as reason, COUNT(*) as count FROM `exit-app` GROUP BY Reason_for_Leaving'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching exit reasons summary:', error);
    throw error;
  }
}

// Get department exit counts
export async function getDepartmentExitCounts() {
  try {
    const [rows] = await pool.query(
      'SELECT DEPT as department, COUNT(*) as count FROM `exit-app` GROUP BY DEPT'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching department exit counts:', error);
    throw error;
  }
}

// Get monthly exit trends
export async function getMonthlyExitTrends() {
  try {
    const [rows] = await pool.query(
      'SELECT Month_of_Exit_Interview as month, COUNT(*) as count FROM `exit-app` GROUP BY Month_of_Exit_Interview ORDER BY MIN(Date_of_Exit_Interview)'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching monthly exit trends:', error);
    throw error;
  }
}

// Get recommendation statistics
export async function getRecommendationStats() {
  try {
    const [rows] = await pool.query(
      'SELECT Recommend as response, COUNT(*) as count FROM `exit-app` GROUP BY Recommend'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching recommendation stats:', error);
    throw error;
  }
} 