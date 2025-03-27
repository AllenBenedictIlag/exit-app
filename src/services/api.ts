import axios from 'axios';
import { 
  User, 
  ExitInterview, 
  ExitInterviewFormData, 
  DepartmentExitData,
  MonthlyExitData,
  ExitReasonData
} from '@/types';

// For development, we'll use a base URL for our API
// In production, this would be your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const authService = {
  login: async (username: string, password: string) => {
    try {
      // In a real app, this would call the backend API
      // For now, we'll simulate a successful login with hardcoded credentials
      if (username === 'admin' && password === 'password') {
        // Mock successful response
        const mockResponse = {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: 'admin',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            role: 'admin' as const,
          },
        };
        
        // Store the token
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('user', JSON.stringify(mockResponse.user));
        
        return mockResponse;
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },
};

// Exit interview services
export const exitInterviewService = {
  // Get all exit interviews
  getExitInterviews: async () => {
    try {
      // In a real app, you would call the API
      // return await api.get('/exit-interviews');
      
      // For now, return mock data
      return getMockExitInterviews();
    } catch (error) {
      throw error;
    }
  },
  
  // Get a specific exit interview by ID
  getExitInterview: async (id: number) => {
    try {
      // In a real app, you would call the API
      // return await api.get(`/exit-interviews/${id}`);
      
      // For now, return mock data
      const interviews = getMockExitInterviews();
      const interview = interviews.find(i => i.id === id.toString());
      if (!interview) {
        throw new Error('Interview not found');
      }
      return interview;
    } catch (error) {
      throw error;
    }
  },
  
  // Submit a new exit interview
  submitExitInterview: async (data: ExitInterviewFormData) => {
    try {
      // In a real app, you would call the API
      // return await api.post('/exit-interviews', data);
      
      // For now, just log the data and return a success response
      console.log('Submitted exit interview data:', data);
      return {
        success: true,
        message: 'Exit interview submitted successfully',
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Update an existing exit interview
  updateExitInterview: async (id: number, data: Partial<ExitInterviewFormData>) => {
    try {
      // In a real app, you would call the API
      // return await api.put(`/exit-interviews/${id}`, data);
      
      // For now, just log the data and return a success response
      console.log(`Updated exit interview ${id} with data:`, data);
      return {
        success: true,
        message: 'Exit interview updated successfully',
      };
    } catch (error) {
      throw error;
    }
  },
};

// Report services
export const reportService = {
  // Get monthly exit trends
  getMonthlyExitTrends: async (year?: number) => {
    try {
      // In a real app, you would call the API
      // return await api.get(`/reports/monthly-trends?year=${year || new Date().getFullYear()}`);
      
      // For now, return mock data
      return getMockMonthlyExitData();
    } catch (error) {
      throw error;
    }
  },
  
  // Get exit reasons distribution
  getExitReasons: async () => {
    try {
      // In a real app, you would call the API
      // return await api.get('/reports/exit-reasons');
      
      // For now, return mock data
      return getMockExitReasons();
    } catch (error) {
      throw error;
    }
  },
  
  // Get department exit data
  getDepartmentExits: async () => {
    try {
      // In a real app, you would call the API
      // return await api.get('/reports/department-exits');
      
      // For now, return mock data
      return getMockDepartmentExitData();
    } catch (error) {
      throw error;
    }
  },
};

// User services
export const userService = {
  // Get all users
  getUsers: async () => {
    try {
      // In a real app, you would call the API
      // return await api.get('/users');
      
      // For now, return mock data
      return getMockUsers();
    } catch (error) {
      throw error;
    }
  },
  
  // Get a specific user by ID
  getUser: async (id: number) => {
    try {
      // In a real app, you would call the API
      // return await api.get(`/users/${id}`);
      
      // For now, return mock data
      const users = getMockUsers();
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new user
  createUser: async (userData: Partial<User>) => {
    try {
      // In a real app, you would call the API
      // return await api.post('/users', userData);
      
      // For now, just log the data and return a success response
      console.log('Created user with data:', userData);
      return {
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Update an existing user
  updateUser: async (id: number, userData: Partial<User>) => {
    try {
      // In a real app, you would call the API
      // return await api.put(`/users/${id}`, userData);
      
      // For now, just log the data and return a success response
      console.log(`Updated user ${id} with data:`, userData);
      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw error;
    }
  },
};

// Mock data functions
function getMockUsers(): User[] {
  return [
    { 
      id: 1, 
      username: 'admin',
      email: 'admin@example.com', 
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      department: 'IT',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 2, 
      username: 'hrmanager',
      email: 'hr@example.com', 
      firstName: 'HR',
      lastName: 'Manager',
      role: 'hr_manager',
      department: 'Human Resources',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 3, 
      username: 'manager1',
      email: 'manager@example.com', 
      firstName: 'Department',
      lastName: 'Manager',
      role: 'manager',
      department: 'Engineering',
      isActive: true,
      lastLogin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];
}

function getMockExitInterviews(): ExitInterview[] {
  return [
    {
      id: "1",
      employeeId: "EMP101",
      fullName: "John Doe",
      department: "engineering",
      businessUnit: "sensors",
      position: "Software Engineer",
      immediateSuperior: "Jane Smith",
      lastWorkingDay: "2023-08-15",
      submissionDate: "2023-07-15",
      status: "submitted",
      exitReasons: {
        primaryReasons: {
          anotherJobAbroad: true,
          practiceProf: true
        },
        countryAbroad: "Singapore",
        moreDesirable: {
          careerAdvancement: true,
          higherSalary: true
        },
        additionalComments: "Looking for more challenging projects in Singapore."
      },
      feedback: {
        careerGrowth: "littleChancesButHopeful",
        careerGrowthComments: "Limited opportunities in my specialized field.",
        payRate: "bitLowAcceptable",
        payRateComments: "Below market for my experience level.",
        benefits: "adequate",
        workload: "tooMuchWork",
        workloadComments: "Often working evenings and weekends to meet deadlines.",
        recommend: "yes",
        recommendComments: "Great colleagues and learning experience.",
        improvementFeedback: "More career development programs would be beneficial.",
        dpaConsent: true
      }
    },
    {
      id: "2",
      employeeId: "EMP102",
      fullName: "Sarah Johnson",
      department: "marketing",
      businessUnit: "corporate",
      position: "Marketing Specialist",
      immediateSuperior: "Michael Brown",
      lastWorkingDay: "2023-09-30",
      submissionDate: "2023-08-30",
      status: "reviewed",
      exitReasons: {
        primaryReasons: {
          business: true,
          personalReason: true
        },
        moreDesirable: {
          workLifeBalance: true
        },
        additionalComments: "Starting my own marketing consultancy."
      },
      feedback: {
        careerGrowth: "goodChancesDepending",
        payRate: "fairEnough",
        benefits: "veryAdequate",
        benefitsComments: "Excellent health and retirement benefits.",
        workload: "justEnoughLoad",
        recommend: "yes",
        improvementFeedback: "Better communication between departments would help.",
        dpaConsent: true
      }
    },
    {
      id: "3",
      employeeId: "EMP103",
      fullName: "Robert Chen",
      department: "operations",
      businessUnit: "capacitors",
      position: "Production Supervisor",
      immediateSuperior: "Lisa Wong",
      lastWorkingDay: "2023-10-15",
      submissionDate: "2023-09-15",
      status: "draft",
      exitReasons: {
        primaryReasons: {
          diffSuperior: true,
          dislikeCompanyProc: true
        },
        additionalComments: "Management style conflicts with my work approach."
      },
      feedback: {
        careerGrowth: "veryLittleChances",
        careerGrowthComments: "No clear path for advancement.",
        payRate: "notCommensurate",
        benefits: "adequate",
        workload: "tooMuchWork",
        workloadComments: "Understaffed department creates excessive workload.",
        recommend: "no",
        recommendComments: "High stress environment with little recognition.",
        dpaConsent: true
      }
    }
  ];
}

function getMockMonthlyExitData(): MonthlyExitData[] {
  return [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 10 },
    { month: 'Apr', count: 15 },
    { month: 'May', count: 9 },
    { month: 'Jun', count: 11 },
    { month: 'Jul', count: 13 },
    { month: 'Aug', count: 7 },
    { month: 'Sep', count: 9 },
    { month: 'Oct', count: 16 },
    { month: 'Nov', count: 14 },
    { month: 'Dec', count: 10 },
  ];
}

function getMockExitReasons(): ExitReasonData[] {
  return [
    { name: 'Another Job', value: 28 },
    { name: 'Business', value: 15 },
    { name: 'Personal Reason', value: 18 },
    { name: 'Continue to Study', value: 10 },
    { name: 'Health', value: 8 },
    { name: 'Family Reasons', value: 12 },
    { name: 'Differences with Superior', value: 5 },
    { name: 'Practice Profession', value: 4 }
  ];
}

function getMockDepartmentExitData(): DepartmentExitData[] {
  return [
    { department: 'Engineering', count: 24, percentage: 8.5 },
    { department: 'Sales', count: 18, percentage: 10.2 },
    { department: 'Marketing', count: 12, percentage: 9.8 },
    { department: 'Human Resources', count: 5, percentage: 7.5 },
    { department: 'Finance', count: 9, percentage: 6.2 },
    { department: 'Operations', count: 15, percentage: 11.3 },
    { department: 'IT', count: 8, percentage: 5.9 },
  ];
}

export default api;