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

  // Get values from primary reason checkboxes
  const isAnotherJob = watch('primaryReasons.anotherJob');
  const isOwnBusiness = watch('primaryReasons.business');
  const isAnotherJobAbroad = watch('primaryReasons.anotherJobAbroad');

  // List of countries for dropdown
  const countries = [
    "Australia", "Canada", "China", "France", "Germany", "Japan", 
    "Malaysia", "New Zealand", "Singapore", "South Korea", "Taiwan", 
    "United Arab Emirates", "United Kingdom", "United States of America", 
    "Other"
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Exit Reasons</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is/are your reason for leaving TDK? (Select all that apply)
        </label>
        <div className="space-y-3">
          {[
            { id: 'anotherJob', label: 'Another Job (Local)' },
            { id: 'anotherJobAbroad', label: 'Another Job (Abroad)' },
            { id: 'business', label: 'Business' },
            { id: 'practiceProf', label: 'Practice Profession' },
            { id: 'continueStudy', label: 'Continue to Study' },
            { id: 'health', label: 'Health' },
            { id: 'personalReason', label: 'Personal Reason' },
            { id: 'familyReasons', label: 'Family Reasons' },
            { id: 'diffCoEmployees', label: 'Differences with Co-Employees' },
            { id: 'diffSuperior', label: 'Differences with Superior' },
            { id: 'dislikeCompanyProc', label: 'Dislike Company Procedure' },
            { id: 'other', label: 'Other' }
          ].map((reason) => (
            <div key={reason.id} className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={reason.id}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  {...register(`primaryReasons.${reason.id}`, {
                    validate: (_, formValues) => {
                      // Ensure at least one reason is selected
                      const values = formValues.primaryReasons || {};
                      return Object.values(values).some(v => v === true) || "Please select at least one reason";
                    }
                  })}
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
        {errors.primaryReasons && (
          <p className="mt-1 text-sm text-red-600">{errors.primaryReasons.root?.message as string}</p>
        )}
      </div>

      {/* Country dropdown when Another Job (Abroad) is selected */}
      {isAnotherJobAbroad && (
        <div className="mt-4">
          <label htmlFor="countryAbroad" className="block text-sm font-medium text-gray-700">
            Which country will you be working in?
          </label>
          <select
            id="countryAbroad"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register('countryAbroad', { 
              required: isAnotherJobAbroad ? 'Please select a country' : false 
            })}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.countryAbroad && (
            <p className="mt-1 text-sm text-red-600">{errors.countryAbroad.message as string}</p>
          )}
        </div>
      )}

      {/* Other country input field */}
      {isAnotherJobAbroad && watch('countryAbroad') === 'Other' && (
        <div className="mt-4">
          <label htmlFor="otherCountry" className="block text-sm font-medium text-gray-700">
            Please specify the country:
          </label>
          <input
            type="text"
            id="otherCountry"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter country name"
            {...register('otherCountry', { 
              required: watch('countryAbroad') === 'Other' ? 'Please specify the country' : false 
            })}
          />
          {errors.otherCountry && (
            <p className="mt-1 text-sm text-red-600">{errors.otherCountry.message as string}</p>
          )}
        </div>
      )}

      {(isAnotherJob || isOwnBusiness) && (
        <div>
          <label htmlFor="moreDesirableReason" className="block text-sm font-medium text-gray-700">
            If your reason for resigning is another job or having own business, why do you consider it more desirable?
          </label>
          <div className="space-y-3 mt-2">
            {[
              { id: 'higherSalary', label: 'Higher Salary' },
              { id: 'betterBenefits', label: 'Better Benefits' },
              { id: 'careerAdvancement', label: 'Career Advancement' },
              { id: 'convenientLocation', label: 'More convenient Location' },
              { id: 'betterCulture', label: 'Better Work Culture' },
              { id: 'workLifeBalance', label: 'Better Work-Life Balance' },
              { id: 'otherDesirable', label: 'Other' }
            ].map((reason) => (
              <div key={reason.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={reason.id}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register(`moreDesirable.${reason.id}`, {
                      validate: (_, formValues) => {
                        if (isAnotherJob || isOwnBusiness || isAnotherJobAbroad) {
                          // Ensure at least one reason is selected if another job or business is selected
                          const values = formValues.moreDesirable || {};
                          return Object.values(values).some(v => v === true) || "Please select at least one reason";
                        }
                        return true;
                      }
                    })}
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
          {errors.moreDesirable && (
            <p className="mt-1 text-sm text-red-600">{errors.moreDesirable.root?.message as string}</p>
          )}
        </div>
      )}
      
      {(isAnotherJob || isOwnBusiness || isAnotherJobAbroad) && watch('moreDesirable.otherDesirable') && (
        <div>
          <label htmlFor="otherDesirableReason" className="block text-sm font-medium text-gray-700">
            Please specify your other reason:
          </label>
          <textarea
            id="otherDesirableReason"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Please describe why you consider it more desirable..."
            {...register('otherDesirableReason', { 
              required: watch('moreDesirable.otherDesirable') ? 'Please specify your other reason' : false 
            })}
          />
          {errors.otherDesirableReason && (
            <p className="mt-1 text-sm text-red-600">{errors.otherDesirableReason.message as string}</p>
          )}
        </div>
      )}

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