'use client';

import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface FormStepperProps {
  steps: Step[];
  currentStep: number;
}

export default function FormStepper({ steps, currentStep }: FormStepperProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step) => (
          <li key={step.id} className="md:flex-1">
            {step.id < currentStep ? (
              <div className="group flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">
                  <CheckCircle className="h-5 w-5 inline mr-2" />
                  {step.name}
                </span>
                <span className="text-sm font-medium">{step.description}</span>
              </div>
            ) : step.id === currentStep ? (
              <div className="flex flex-col border-l-4 border-blue-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">{step.name}</span>
                <span className="text-sm font-medium">{step.description}</span>
              </div>
            ) : (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500">{step.name}</span>
                <span className="text-sm font-medium">{step.description}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}