'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

// Create a component to handle the search params
function LayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardName = searchParams.get('name');
  const templateId = searchParams.get('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(3);

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Template' },
    { number: 3, title: 'Choose Layout' },
    { number: 4, title: 'Add Content' },
  ];

  const templates = [
    {
      id: 'grid-2x2',
      name: 'Classic Grid',
      description: 'A balanced 2x2 grid layout',
      preview: (
        <div className="grid grid-cols-2 gap-3 w-full aspect-square">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
          ))}
        </div>
      )
    },
    {
      id: 'featured',
      name: 'Featured Focus',
      description: 'One large image with supporting elements',
      preview: (
        <div className="grid grid-cols-3 gap-3 w-full aspect-square">
          <div className="col-span-2 row-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
        </div>
      )
    },
    {
      id: 'masonry',
      name: 'Dynamic Flow',
      description: 'Flexible arrangement for various content sizes',
      preview: (
        <div className="grid grid-cols-3 gap-3 w-full aspect-square">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="row-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
          <div className="col-span-2 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        </div>
      )
    }
  ];

  // Add navigation handler
  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/create/content?name=${encodeURIComponent(boardName || '')}&template=${templateId}&layout=${selectedTemplate}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                {index > 0 && (
                  <div 
                    className={`h-[2px] w-[100px] mx-4 ${
                      currentStep > index ? 'bg-[#FF1B7C]' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                    ${currentStep >= step.number 
                      ? 'bg-[#FF1B7C] text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.number}
                  </div>
                  <span className={`text-sm font-medium ${
                    currentStep >= step.number 
                      ? 'text-[#15192C] dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
            Choose Your Vision Board Layout
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Select a template that best represents your vision
          </p>
        </div>

        {/* Layout Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className="p-4 md:p-6 rounded-xl border-2 transition-all"
            >
              <div className="aspect-square mb-4 md:mb-6">
                {template.preview}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
            </button>
          ))}
        </div>

        {/* Action Button - Centered and responsive */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="w-full sm:w-auto min-w-[200px] py-4 md:py-6 px-6 md:px-8 rounded-xl"
          >
            Continue to Content →
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function ChooseLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LayoutContent />
    </Suspense>
  );
} 