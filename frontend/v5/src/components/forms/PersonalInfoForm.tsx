'use client';

import { useForm } from 'react-hook-form';

interface PersonalInfoFormProps {
  onNext: () => void;
  formData: any;
  onChange: (data: any) => void;
}

export default function PersonalInfoForm({ onNext, formData, onChange }: PersonalInfoFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const onSubmit = (data: any) => {
    onChange(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">
            Employee ID
          </label>
          <input
            type="text"
            id="employeeId"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="EMP12345"
            {...register('employeeId', { required: 'Employee ID is required' })}
          />
          {errors.employeeId && (
            <p className="mt-1 text-sm text-red-600">{errors.employeeId.message as string}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="John Doe"
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register('department', { required: 'Department is required' })}
          >
            <option value="">Select Department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
            <option value="operations">Operations</option>
            <option value="finance">Finance</option>
            <option value="it">IT</option>
          </select>
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message as string}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Software Engineer"
            {...register('position', { required: 'Position is required' })}
          />
          {errors.position && (
            <p className="mt-1 text-sm text-red-600">{errors.position.message as string}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="managerName" className="block text-sm font-medium text-gray-700">
            Manager Name
          </label>
          <input
            type="text"
            id="managerName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Jane Smith"
            {...register('managerName', { required: 'Manager name is required' })}
          />
          {errors.managerName && (
            <p className="mt-1 text-sm text-red-600">{errors.managerName.message as string}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastWorkingDate" className="block text-sm font-medium text-gray-700">
            Last Working Date
          </label>
          <input
            type="date"
            id="lastWorkingDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register('lastWorkingDate', { required: 'Last working date is required' })}
          />
          {errors.lastWorkingDate && (
            <p className="mt-1 text-sm text-red-600">{errors.lastWorkingDate.message as string}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
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