'use client';

import { useState } from 'react';
import FormStepper from '@/components/forms/FormStepper';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExitReasonsForm from '@/components/forms/ExitReasonsForm';
import ExperienceFeedbackForm from '@/components/forms/ExperienceFeedbackForm';
import ReviewSubmitForm from '@/components/forms/ReviewSubmitForm';

const steps = [
  { id: 1, name: 'Step 1', description: 'Personal Information' },
  { id: 2, name: 'Step 2', description: 'Exit Reasons' },
  { id: 3, name: 'Step 3', description: 'Experience & Feedback' },
  { id: 4, name: 'Step 4', description: 'Review & Submit' },
];

export default function ExitInterviewForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    exitReasons: {},
    feedback: {},
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

  const handleSubmit = () => {
    // In a real application, this would send the form data to an API
    console.log('Form submitted:', formData);
    // Show a success message or redirect
    alert('Exit interview submitted successfully!');
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