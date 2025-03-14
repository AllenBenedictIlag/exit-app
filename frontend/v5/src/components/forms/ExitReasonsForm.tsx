'use client';

import { useForm } from 'react-hook-form';

interface ExitReasonsFormProps {
  onNext: () => void;
  onPrev: () => void;
  formData: any;
  onChange: (data: any) => void;
}

export default function ExitReasonsForm({ onNext, onPrev, formData, onChange }: ExitReasonsFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const primaryReason = watch('primaryReason');

  const onSubmit = (data: any) => {
    onChange(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Exit Reasons</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your primary reason for leaving? (Choose one)
        </label>
        <div className="space-y-3">
          {[
            { id: 'better_opportunity', label: 'Better opportunity elsewhere' },
            { id: 'career_growth', label: 'Limited career growth opportunities' },
            { id: 'compensation', label: 'Compensation and benefits' },
            { id: 'work_life_balance', label: 'Work-life balance' },
            { id: 'work_environment', label: 'Work environment or culture' },
            { id: 'relocation', label: 'Relocation or personal reasons' },
            { id: 'health', label: 'Health or family-related reasons' },
            { id: 'management', label: 'Management or leadership issues' },
            { id: 'company_stability', label: 'Company stability or direction' },
            { id: 'other', label: 'Other' }
          ].map((reason) => (
            <div key={reason.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={reason.id}
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  value={reason.id}
                  {...register('primaryReason', { required: 'Please select a primary reason' })}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={reason.id} className="font-medium text-gray-700">
                  {reason.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {errors.primaryReason && (
          <p className="mt-1 text-sm text-red-600">{errors.primaryReason.message as string}</p>
        )}
      </div>
      
      {primaryReason === 'other' && (
        <div>
          <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700">
            Please specify your other reason:
          </label>
          <textarea
            id="otherReason"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Please describe your reason for leaving..."
            {...register('otherReason', { 
              required: primaryReason === 'other' ? 'Please specify your other reason' : false 
            })}
          />
          {errors.otherReason && (
            <p className="mt-1 text-sm text-red-600">{errors.otherReason.message as string}</p>
          )}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Any secondary reasons? (Select all that apply)
        </label>
        <div className="space-y-3">
          {[
            { id: 'sec_compensation', label: 'Compensation and benefits' },
            { id: 'sec_work_environment', label: 'Work environment or culture' },
            { id: 'sec_management', label: 'Management or leadership' },
            { id: 'sec_growth', label: 'Professional development' },
            { id: 'sec_workload', label: 'Workload or stress' },
            { id: 'sec_recognition', label: 'Recognition or appreciation' },
            { id: 'sec_flexibility', label: 'Job flexibility' },
            { id: 'sec_tools', label: 'Tools or resources' }
          ].map((reason) => (
            <div key={reason.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={reason.id}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  value={reason.id}
                  {...register('secondaryReasons')}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={reason.id} className="font-medium text-gray-700">
                  {reason.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700">
          Additional comments about your reasons for leaving:
        </label>
        <textarea
          id="additionalComments"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Any other feedback about your reasons for leaving..."
          {...register('additionalComments')}
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