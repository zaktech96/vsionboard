'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';

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
      description: 'Start with 2x2 grid, expand as needed',
      preview: (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-square" />
            ))}
          </div>
          <div className="w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <span className="text-xs text-gray-400">+ Add More Images</span>
          </div>
        </div>
      )
    },
    {
      id: 'featured',
      name: 'Featured Focus',
      description: 'One large image with expandable supporting elements',
      preview: (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="col-span-2 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-[2/1]" />
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-[2/1]" />
          </div>
          <div className="w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
            <span className="text-xs text-gray-400">+ Add Supporting Images</span>
          </div>
        </div>
      )
    },
    {
      id: 'gallery-flow',
      name: 'Gallery Grid',
      description: 'Flexible grid for multiple images',
      preview: (
        <div className="grid grid-cols-3 gap-2 w-full aspect-square">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-xl" />
          ))}
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

  // Add handleStepClick function
  const handleStepClick = (stepNumber: number) => {
    if (stepNumber >= currentStep) return;
    
    switch (stepNumber) {
      case 1:
        router.push('/create');
        break;
      case 2:
        router.push(`/create/template?name=${encodeURIComponent(boardName || '')}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[#FF1B7C] hover:opacity-80
                       transition-colors duration-200 mr-8"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center justify-between flex-1">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  {index > 0 && (
                    <div className={`h-[2px] w-[100px] mx-4 ${
                      currentStep > index ? 'bg-[#FF1B7C]' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                  <div 
                    onClick={() => handleStepClick(step.number)}
                    className={`group flex items-center gap-2 md:gap-3 cursor-pointer relative
                                transition-all duration-200 hover:translate-x-1`}
                  >
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full 
                                    flex items-center justify-center 
                                    text-sm md:text-base font-medium
                                    transition-all duration-300
                                    ${currentStep >= step.number 
                                      ? 'bg-[#FF1B7C] text-white scale-110' 
                                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-[#FF1B7C]/20'}`}
                    >
                      {step.number}
                    </div>
                    <span className={`text-xs md:text-sm font-medium whitespace-nowrap 
                                      transition-colors duration-200
                                      ${currentStep >= step.number 
                                        ? 'text-[#15192C] dark:text-white' 
                                        : 'text-gray-500 dark:text-gray-400 group-hover:text-[#FF1B7C]'}`}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 py-8 md:py-12">
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
              className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-300
                ${selectedTemplate === template.id 
                  ? 'border-[#FF1B7C] bg-[#FFE7F1]/20' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-[#FF1B7C]/40 hover:bg-[#FFE7F1]/10'}`}
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

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="w-full sm:w-auto min-w-[200px] py-4 md:py-6 px-6 md:px-8 rounded-xl
                     bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300
                     shadow-[0_8px_30px_rgb(230,21,111,0.2)]"
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