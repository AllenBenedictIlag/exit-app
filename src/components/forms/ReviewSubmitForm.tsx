'use client';

interface ReviewSubmitFormProps {
  onSubmit: () => void;
  onPrev: () => void;
  formData: any;
}

export default function ReviewSubmitForm({ 
  onSubmit, 
  onPrev, 
  formData 
}: ReviewSubmitFormProps) {
  const { personalInfo, exitReasons, feedback } = formData;

  const getRatingLabel = (rating: number) => {
    const labels = {
      1: 'Very Dissatisfied',
      2: 'Dissatisfied',
      3: 'Neutral',
      4: 'Satisfied',
      5: 'Very Satisfied'
    };
    return labels[rating as keyof typeof labels] || '';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-3">Personal Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.employeeId || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.fullName || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.department || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Position</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.position || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Manager</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.managerName || 'N/A'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Last Working Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{personalInfo?.lastWorkingDate || 'N/A'}</dd>
              </div>
            </dl>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Exit Reasons</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Primary Reason for Leaving</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {exitReasons?.primaryReason === 'other' 
                    ? exitReasons?.otherReason 
                    : exitReasons?.primaryReason?.replace(/_/g, ' ')?.charAt(0).toUpperCase() + 
                      exitReasons?.primaryReason?.replace(/_/g, ' ')?.slice(1) || 'N/A'}
                </dd>
              </div>
              {exitReasons?.secondaryReasons?.length > 0 && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Secondary Reasons</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {Array.isArray(exitReasons?.secondaryReasons) && exitReasons?.secondaryReasons.map((reason: string) => (
                        <li key={reason}>
                          {reason.replace('sec_', '').replace(/_/g, ' ').charAt(0).toUpperCase() + 
                           reason.replace('sec_', '').replace(/_/g, ' ').slice(1)}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {exitReasons?.additionalComments && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Additional Comments</dt>
                  <dd className="mt-1 text-sm text-gray-900">{exitReasons.additionalComments}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Experience & Feedback</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Satisfaction Ratings</dt>
                <dd className="mt-2">
                  <ul className="divide-y divide-gray-200">
                    {[
                      { id: 'workEnvironment', label: 'Work Environment' },
                      { id: 'management', label: 'Management and Leadership' },
                      { id: 'compensation', label: 'Compensation and Benefits' },
                      { id: 'workLifeBalance', label: 'Work-Life Balance' },
                      { id: 'careerGrowth', label: 'Career Growth Opportunities' },
                      { id: 'jobSatisfaction', label: 'Overall Job Satisfaction' },
                    ].map((item) => (
                      <li key={item.id} className="py-2 flex justify-between">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="text-sm font-medium">
                          {feedback?.[item.id] ? `${feedback[item.id]} - ${getRatingLabel(parseInt(feedback[item.id]))}` : 'Not rated'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              
              {feedback?.positiveFeedback && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">What You Liked Most</dt>
                  <dd className="mt-1 text-sm text-gray-900">{feedback.positiveFeedback}</dd>
                </div>
              )}
              
              {feedback?.improvementFeedback && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Areas for Improvement</dt>
                  <dd className="mt-1 text-sm text-gray-900">{feedback.improvementFeedback}</dd>
                </div>
              )}
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Would Recommend Company</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {feedback?.wouldRecommend 
                    ? feedback.wouldRecommend.charAt(0).toUpperCase() + feedback.wouldRecommend.slice(1) 
                    : 'N/A'}
                </dd>
              </div>
              
              {feedback?.additionalFeedback && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Additional Feedback</dt>
                  <dd className="mt-1 text-sm text-gray-900">{feedback.additionalFeedback}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
      
      <div className="p-4 border border-amber-300 bg-amber-50 rounded-md">
        <p className="text-sm text-amber-800">
          Please review your responses above before submitting. Once submitted, you will not be able to make changes.
        </p>
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          className="btn-secondary"
          onClick={onPrev}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={onSubmit}
        >
          Submit Exit Interview
        </button>
      </div>
    </div>
  );
}