import { NextResponse } from 'next/server';
import { 
  getAllExitInterviews,
  getExitInterviewsByMonth,
  getExitReasonsSummary,
  getDepartmentExitCounts,
  getMonthlyExitTrends,
  getRecommendationStats
} from '@/services/exitService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dataType = searchParams.get('type') || 'all';
  const month = searchParams.get('month');
  
  try {
    let data;
    
    switch (dataType) {
      case 'reasons':
        data = await getExitReasonsSummary();
        break;
      case 'departments':
        data = await getDepartmentExitCounts();
        break;
      case 'trends':
        data = await getMonthlyExitTrends();
        break;
      case 'recommendations':
        data = await getRecommendationStats();
        break;
      case 'by-month':
        if (!month) {
          return NextResponse.json(
            { success: false, error: 'Month parameter is required' },
            { status: 400 }
          );
        }
        data = await getExitInterviewsByMonth(month);
        break;
      case 'all':
      default:
        data = await getAllExitInterviews();
        break;
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
} 