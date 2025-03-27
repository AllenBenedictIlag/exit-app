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

  const getSelectedReasons = (data: any) => {
    if (!data) return 'None provided';
    
    const keys = Object.keys(data);
    const selectedReasons = keys.filter(key => data[key] === true);
    
    if (selectedReasons.length === 0) return 'None provided';
    
    return selectedReasons.map(reason => {
      // Convert camelCase to readable format
      return reason.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/([a-z])([A-Z])/g, '$1 $2');
    }).join(', ');
  };
  
  const getRadioFieldLabel = (fieldName: string, value: string) => {
    const fieldMappings: Record<string, Record<string, string>> = {
      careerGrowth: {
        veryGoodChance: 'Very good chance',
        goodChancesDepending: 'Good chances depending on performance',
        littleChancesButHopeful: 'Little chances but still hopeful',
        veryLittleChances: 'Very little chances',
        noChances: 'No chances'
      },
      payRate: {
        veryCompensating: 'Very compensating',
        fairEnough: 'Fair enough',
        bitLowAcceptable: 'A bit low although acceptable',
        notCommensurate: 'Not commensurate to job/load',
        veryLow: 'Very low'
      },
      benefits: {
        veryAdequate: 'Very adequate',
        adequate: 'Adequate',
        inadequate: 'Inadequate',
        ifAny: 'If any'
      },
      workload: {
        minimalWork: 'Minimal work',
        justEnoughLoad: 'Just enough load',
        tooMuchWork: 'Too much work'
      },
      recommend: {
        yes: 'Yes',
        no: 'No'
      }
    };
    
    return fieldMappings[fieldName]?.[value] || value;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review & Submit</h2>
      
      <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
        </div>
        <div className="px-4 py-3">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.fullName || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Employee ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.employeeId || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Department</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.department || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Business Unit</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.businessUnit || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Position</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.position || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Immediate Superior</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.immediateSuperior || 'N/A'}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Working Day</dt>
              <dd className="mt-1 text-sm text-gray-900">{personalInfo?.lastWorkingDay || 'N/A'}</dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Exit Reasons</h3>
        </div>
        <div className="px-4 py-3">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Primary Reasons for Leaving</dt>
              <dd className="mt-1 text-sm text-gray-900">{getSelectedReasons(exitReasons?.primaryReasons)}</dd>
            </div>
            
            {exitReasons?.primaryReasons?.anotherJobAbroad && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Destination Country</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {exitReasons.countryAbroad === 'Other' 
                    ? exitReasons.otherCountry 
                    : exitReasons.countryAbroad || 'Not specified'}
                </dd>
              </div>
            )}
            
            {exitReasons?.primaryReasons?.anotherJob || exitReasons?.primaryReasons?.business || exitReasons?.primaryReasons?.anotherJobAbroad ? (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Why More Desirable</dt>
                <dd className="mt-1 text-sm text-gray-900">{getSelectedReasons(exitReasons?.moreDesirable)}</dd>
              </div>
            ) : null}
            
            {exitReasons?.otherDesirableReason && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Other Desirable Reasons Specified</dt>
                <dd className="mt-1 text-sm text-gray-900">{exitReasons.otherDesirableReason}</dd>
              </div>
            )}
            
            {exitReasons?.additionalComments && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Additional Comments on Exit Reasons</dt>
                <dd className="mt-1 text-sm text-gray-900">{exitReasons.additionalComments}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Experience & Feedback</h3>
        </div>
        <div className="px-4 py-3">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Career Growth Opportunities</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {feedback?.careerGrowth ? getRadioFieldLabel('careerGrowth', feedback.careerGrowth) : 'N/A'}
              </dd>
            </div>
            
            {feedback?.careerGrowthComments && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Career Growth Comments</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.careerGrowthComments}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Pay Rate</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {feedback?.payRate ? getRadioFieldLabel('payRate', feedback.payRate) : 'N/A'}
              </dd>
            </div>
            
            {feedback?.payRateComments && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Pay Rate Comments</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.payRateComments}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Benefits</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {feedback?.benefits ? getRadioFieldLabel('benefits', feedback.benefits) : 'N/A'}
              </dd>
            </div>
            
            {feedback?.benefitsComments && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Benefits Comments</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.benefitsComments}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Workload Perception</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {feedback?.workload ? getRadioFieldLabel('workload', feedback.workload) : 'N/A'}
              </dd>
            </div>
            
            {feedback?.workloadComments && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Workload Comments</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.workloadComments}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Would Recommend TDK</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {feedback?.recommend ? getRadioFieldLabel('recommend', feedback.recommend) : 'N/A'}
              </dd>
            </div>
            
            {feedback?.recommendComments && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Recommendation Comments</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.recommendComments}</dd>
              </div>
            )}
            
            {feedback?.improvementFeedback && (
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Suggestions for Improvement</dt>
                <dd className="mt-1 text-sm text-gray-900">{feedback.improvementFeedback}</dd>
              </div>
            )}
            
            <div>
              <dt className="text-sm font-medium text-gray-500">DPA Consent</dt>
              <dd className="mt-1 text-sm text-gray-900">{feedback?.dpaConsent ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
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