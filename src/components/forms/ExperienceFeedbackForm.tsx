'use client';

import { useForm } from 'react-hook-form';

interface ExperienceFeedbackFormProps {
  onNext: () => void;
  onPrev: () => void;
  formData: any;
  onChange: (data: any) => void;
}

export default function ExperienceFeedbackForm({ 
  onNext, 
  onPrev, 
  formData, 
  onChange 
}: ExperienceFeedbackFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
    mode: 'onChange'
  });

  const onSubmit = (data: any) => {
    onChange(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-xl font-semibold mb-4">Experience & Feedback</h2>
      
      {/* Career Growth */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How did you feel about the opportunity for career growth in the company?
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'veryGoodChance', label: 'Very good chance' },
            { id: 'goodChancesDepending', label: 'Good chances depending on performance' },
            { id: 'littleChancesButHopeful', label: 'Little chances but still hopeful' },
            { id: 'veryLittleChances', label: 'Very little chances' },
            { id: 'noChances', label: 'No chances' }
          ].map((option) => (
            <div key={option.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`careerGrowth_${option.id}`}
                  type="radio"
                  value={option.id}
                  {...register('careerGrowth', { required: 'This field is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`careerGrowth_${option.id}`} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.careerGrowth && (
          <p className="mt-1 text-sm text-red-600">{errors.careerGrowth.message as string}</p>
        )}
        
        <div className="mt-3">
          <label htmlFor="careerGrowthComments" className="block text-sm font-medium text-gray-700">
            Additional comments on career growth:
          </label>
          <textarea
            id="careerGrowthComments"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional comments..."
            {...register('careerGrowthComments')}
          />
        </div>
      </div>
      
      {/* Pay Rate */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How did you feel about the pay rate?
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'veryCompensating', label: 'Very compensating' },
            { id: 'fairEnough', label: 'Fair enough' },
            { id: 'bitLowAcceptable', label: 'A bit low although acceptable' },
            { id: 'notCommensurate', label: 'Not commensurate to job/load' },
            { id: 'veryLow', label: 'Very low' }
          ].map((option) => (
            <div key={option.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`payRate_${option.id}`}
                  type="radio"
                  value={option.id}
                  {...register('payRate', { required: 'This field is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`payRate_${option.id}`} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.payRate && (
          <p className="mt-1 text-sm text-red-600">{errors.payRate.message as string}</p>
        )}
        
        <div className="mt-3">
          <label htmlFor="payRateComments" className="block text-sm font-medium text-gray-700">
            Additional comments on pay rate:
          </label>
          <textarea
            id="payRateComments"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional comments..."
            {...register('payRateComments')}
          />
        </div>
      </div>
      
      {/* Benefits */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How did you feel about the benefits (insurance, leave privileges, hospitalization, medical, others)?
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'veryAdequate', label: 'Very adequate' },
            { id: 'adequate', label: 'Adequate' },
            { id: 'inadequate', label: 'Inadequate' },
            { id: 'ifAny', label: 'If any' }
          ].map((option) => (
            <div key={option.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`benefits_${option.id}`}
                  type="radio"
                  value={option.id}
                  {...register('benefits', { required: 'This field is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`benefits_${option.id}`} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.benefits && (
          <p className="mt-1 text-sm text-red-600">{errors.benefits.message as string}</p>
        )}
        
        <div className="mt-3">
          <label htmlFor="benefitsComments" className="block text-sm font-medium text-gray-700">
            Additional comments on benefits:
          </label>
          <textarea
            id="benefitsComments"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional comments..."
            {...register('benefitsComments')}
          />
        </div>
      </div>
      
      {/* Workload */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          How did you feel about the amount of work you were expected to do?
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'minimalWork', label: 'Minimal work' },
            { id: 'justEnoughLoad', label: 'Just enough load' },
            { id: 'tooMuchWork', label: 'Too much work' }
          ].map((option) => (
            <div key={option.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`workload_${option.id}`}
                  type="radio"
                  value={option.id}
                  {...register('workload', { required: 'This field is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`workload_${option.id}`} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.workload && (
          <p className="mt-1 text-sm text-red-600">{errors.workload.message as string}</p>
        )}
        
        <div className="mt-3">
          <label htmlFor="workloadComments" className="block text-sm font-medium text-gray-700">
            Additional comments on workload:
          </label>
          <textarea
            id="workloadComments"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional comments..."
            {...register('workloadComments')}
          />
        </div>
      </div>
      
      {/* Recommendation */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Would you recommend TDK to a friend as a place to work?
        </label>
        
        <div className="space-y-2">
          {[
            { id: 'yes', label: 'Yes' },
            { id: 'no', label: 'No' }
          ].map((option) => (
            <div key={option.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={`recommend_${option.id}`}
                  type="radio"
                  value={option.id}
                  {...register('recommend', { required: 'This field is required' })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={`recommend_${option.id}`} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.recommend && (
          <p className="mt-1 text-sm text-red-600">{errors.recommend.message as string}</p>
        )}
        
        <div className="mt-3">
          <label htmlFor="recommendComments" className="block text-sm font-medium text-gray-700">
            Additional comments on recommendation:
          </label>
          <textarea
            id="recommendComments"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Optional comments..."
            {...register('recommendComments')}
          />
        </div>
      </div>
      
      {/* Improvement Feedback */}
      <div className="p-4 bg-gray-50 rounded-md">
        <label htmlFor="improvementFeedback" className="block text-sm font-medium text-gray-700">
          Comments and suggestions on how we can improve the way we do things at TDK:
        </label>
        <textarea
          id="improvementFeedback"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Please share any suggestions for improvement..."
          {...register('improvementFeedback')}
        />
      </div>
      
      {/* DPA Consent */}
      <div className="p-6 border-2 border-blue-100 bg-blue-50 rounded-md shadow-sm">
        <div className="mb-3">
          <h3 className="text-lg font-medium text-blue-800">Data Privacy Act (DPA) Consent</h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed">
            By checking the box below, you acknowledge and consent to TDK:
          </p>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1 leading-relaxed">
            <li>Collecting your personal information provided in this exit interview</li>
            <li>Storing this information securely in compliance with data protection regulations</li>
            <li>Processing and analyzing this information for HR analytics and improvement purposes</li>
            <li>Using anonymized insights to enhance workplace policies and practices</li>
          </ul>
          <p className="mt-2 text-sm text-gray-600">
            Your information will be kept confidential and will only be accessible to authorized HR personnel.
          </p>
        </div>
        
        <div className="mt-4 flex items-start p-3 border border-blue-200 rounded bg-white">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="dpaConsent"
              type="checkbox"
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              {...register('dpaConsent', { 
                required: 'You must agree to the Data Privacy Act consent to proceed' 
              })}
            />
          </div>
          <label htmlFor="dpaConsent" className="ml-3 text-sm font-medium text-gray-700">
            I consent to TDK collecting, storing, and processing my personal information as described above.
          </label>
        </div>
        
        {errors.dpaConsent && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600 font-medium">
              {errors.dpaConsent.message as string}
            </p>
          </div>
        )}
        
        <p className="mt-4 text-xs text-gray-500">
          For more information about how TDK handles your personal data, please refer to our{' '}
          <a href="#" className="text-blue-600 hover:underline">full Privacy Policy</a>.
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
          type="submit"
          className="btn-primary"
        >
          Next
        </button>
      </div>
    </form>
  );
}