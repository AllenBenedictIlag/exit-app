// User Types
export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department: string;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserRole = 'admin' | 'hr_manager' | 'hr_staff' | 'manager' | 'employee';
  
  // Exit Interview Types
  export interface ExitInterview {
    id: number;
    employeeId: number;
    interviewerId?: number;
    interviewDate?: Date;
    status: InterviewStatus;
    submissionDate?: Date;
    lastWorkingDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type InterviewStatus = 'draft' | 'completed' | 'reviewed';
  
  export interface PersonalInfo {
    employeeId: string;
    fullName: string;
    department: string;
    position: string;
    managerName: string;
    lastWorkingDate: string;
  }
  
  export interface ExitReasons {
    primaryReason: string;
    otherReason?: string;
    secondaryReasons?: string[];
    additionalComments?: string;
  }
  
  export interface FeedbackData {
    workEnvironment?: string;
    management?: string;
    compensation?: string;
    workLifeBalance?: string;
    careerGrowth?: string;
    jobSatisfaction?: string;
    positiveFeedback?: string;
    improvementFeedback?: string;
    wouldRecommend?: 'yes' | 'maybe' | 'no';
    additionalFeedback?: string;
  }
  
  export interface ExitInterviewFormData {
    personalInfo: PersonalInfo;
    exitReasons: ExitReasons;
    feedback: FeedbackData;
  }
  
  // Report Types
  export interface DepartmentExitData {
    department: string;
    count: number;
    percentage: number;
  }
  
  export interface MonthlyExitData {
    month: string;
    count: number;
  }
  
  export interface ExitReasonData {
    name: string;
    value: number;
  }
  
  // Dashboard Types
  export interface StatCardData {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
  }