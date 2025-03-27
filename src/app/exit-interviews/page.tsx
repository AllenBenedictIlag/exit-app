'use client';

import { useState } from 'react';
import FormStepper from '@/components/forms/FormStepper';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExitReasonsForm from '@/components/forms/ExitReasonsForm';
import ExperienceFeedbackForm from '@/components/forms/ExperienceFeedbackForm';
import ReviewSubmitForm from '@/components/forms/ReviewSubmitForm';
import { ExitInterviewFormData } from '@/types';

const steps = [
  { id: 1, name: 'Step 1', description: 'Personal Information' },
  { id: 2, name: 'Step 2', description: 'Exit Reasons' },
  { id: 3, name: 'Step 3', description: 'Experience & Feedback' },
  { id: 4, name: 'Step 4', description: 'Review & Submit' },
];

export default function ExitInterviewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ExitInterviewFormData>({
    personalInfo: {
      employeeId: '',
      fullName: '',
      department: '',
      businessUnit: '',
      position: '',
      immediateSuperior: '',
      lastWorkingDay: '',
    },
    exitReasons: {
      primaryReasons: {},
      moreDesirable: {},
      countryAbroad: '',
      otherCountry: '',
    },
    feedback: {
      careerGrowth: '',
      payRate: '',
      benefits: '',
      workload: '',
      recommend: '',
      dpaConsent: false,
    },
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFormDataChange = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async () => {
    // In a real application, this would send the form data to an API
    console.log('Form submitted:', formData);
    
    try {
      // Example API call - replace with your actual API endpoint
      // const response = await fetch('/api/exit-interviews', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     submissionDate: new Date().toISOString(),
      //     status: 'submitted'
      //   }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit exit interview');
      // }
      
      // Show a success message or redirect
      alert('Exit interview submitted successfully!');
      
      // Could also redirect to a thank you page
      // router.push('/exit-interviews/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your exit interview. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Exit Interview Form</h1>
      
      <div className="card mb-8">
        <FormStepper steps={steps} currentStep={currentStep} />
      </div>
      
      <div className="card">
        {currentStep === 1 && (
          <PersonalInfoForm 
            onNext={nextStep} 
            formData={formData.personalInfo} 
            onChange={(data) => handleFormDataChange('personalInfo', data)} 
          />
        )}
        
        {currentStep === 2 && (
          <ExitReasonsForm 
            onNext={nextStep} 
            onPrev={prevStep} 
            formData={formData.exitReasons} 
            onChange={(data) => handleFormDataChange('exitReasons', data)} 
          />
        )}
        
        {currentStep === 3 && (
          <ExperienceFeedbackForm 
            onNext={nextStep} 
            onPrev={prevStep} 
            formData={formData.feedback} 
            onChange={(data) => handleFormDataChange('feedback', data)} 
          />
        )}
        
        {currentStep === 4 && (
          <ReviewSubmitForm 
            onSubmit={handleSubmit} 
            onPrev={prevStep} 
            formData={formData} 
          />
        )}
      </div>
    </div>
  );
}