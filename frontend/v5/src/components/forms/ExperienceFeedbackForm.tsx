'use client';

import { useForm } from 'react-hook-form';

interface ExperienceFeedbackFormProps {
  onNext: () => void;
  onPrev: () => void;
  formData: any;
  onChange: (data: any) => void;
}

const ratingOptions = [
  { value: 5, label: 'Very Satisfied' },
  { value: 4, label: 'Satisfied' },
  { value: 3, label: 'Neutral' },
  { value: 2, label: 'Dissatisfied' },
  { value: 1, label: 'Very Dissatisfied' },
];

export default function ExperienceFeedbackForm({ 
  onNext, 
  onPrev, 
  formData, 
  onChange 
}: ExperienceFeedbackFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    onChange(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Experience & Feedback</h2>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Please rate your satisfaction with the following aspects:</h3>
        
        <div className="space-y-4">
          {[
            { id: 'workEnvironment', label: 'Work Environment' },
            { id: 'management', label: 'Management and Leadership' },
            { id: 'compensation', label: 'Compensation and Benefits' },
            { id: 'workLifeBalance', label: 'Work-Life Balance' },
            { id: 'careerGrowth', label: 'Career Growth Opportunities' },
            { id: 'jobSatisfaction', label: 'Overall Job Satisfaction' },
          ].map((item) => (
            <div key={item.id} className="grid grid-cols-1 gap-2 md:grid-cols-12 md:gap-4 items-center">
              <div className="md:col-span-3">
                <label htmlFor={item.id} className="block text-sm font-medium text-gray-700">
                  {item.label}
                </label>
              </div>
              <div className="md:col-span-9">
                <div className="flex items-center space-x-2">
                  {ratingOptions.map((option) => (
                    <div key={option.value} className="flex flex-col items-center space-y-1">
                      <input
                        type="radio"
                        id={`${item.id}_${option.value}`}
                        value={option.value}
                        {...register(item.id, { required: `Please rate ${item.label}` })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label 
                        htmlFor={`${item.id}_${option.value}`} 
                        className="text-xs text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors[item.id] && (
                  <p className="mt-1 text-sm text-red-600">{errors[item.id]?.message as string}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="positiveFeedback" className="block text-sm font-medium text-gray-700">
          What did you like most about working at our company?
        </label>
        <textarea
          id="positiveFeedback"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Please share any positive aspects of your experience..."
          {...register('positiveFeedback')}
        />
      </div>
      
      <div>
        <label htmlFor="improvementFeedback" className="block text-sm font-medium text-gray-700">
          What could be improved about working at our company?
        </label>
        <textarea
          id="improvementFeedback"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Please share any suggestions for improvement..."
          {...register('improvementFeedback')}
        />
      </div>
      
      <div>
        <label htmlFor="futureRecommendation" className="block text-sm font-medium text-gray-700 mb-2">
          Would you recommend our company as a good place to work?
        </label>
        <div className="mt-1 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="yes"
              {...register('wouldRecommend', { required: 'Please select an option' })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="maybe"
              {...register('wouldRecommend', { required: 'Please select an option' })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">Maybe</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="no"
              {...register('wouldRecommend', { required: 'Please select an option' })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
        {errors.wouldRecommend && (
          <p className="mt-1 text-sm text-red-600">{errors.wouldRecommend.message as string}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="additionalFeedback" className="block text-sm font-medium text-gray-700">
          Any other feedback or comments you'd like to share?
        </label>
        <textarea
          id="additionalFeedback"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Any additional thoughts or feedback..."
          {...register('additionalFeedback')}
        />
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