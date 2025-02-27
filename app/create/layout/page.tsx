'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  gradient: string;
  previewColor: string;
  activeColor: string;
  preview: (selectedState: boolean) => React.ReactElement;
}

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

  const templates: Template[] = [
    {
      id: 'grid-2x2',
      name: 'Classic Grid',
      description: 'Start with 2x2 grid, expand as needed',
      gradient: 'from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40',
      previewColor: 'bg-blue-600/10',
      activeColor: 'bg-blue-600/20',
      preview: (selectedState: boolean) => (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 shadow-md rounded-lg aspect-square" />
            ))}
          </div>
          <div className="w-full h-8 bg-white/95 dark:bg-gray-800/95 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-600">+ Add More Images</span>
          </div>
        </div>
      )
    },
    {
      id: 'featured',
      name: 'Featured Focus',
      description: 'One large image with expandable supporting elements',
      gradient: 'from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40',
      previewColor: 'bg-purple-600/10',
      activeColor: 'bg-purple-600/20',
      preview: (selectedState: boolean) => (
        <div className="flex flex-col gap-2 w-full">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="col-span-2 h-32 bg-white/90 dark:bg-gray-800/90 shadow-md rounded-lg" />
            <div className="bg-white/90 dark:bg-gray-800/90 shadow-md rounded-lg aspect-[2/1]" />
            <div className="bg-white/90 dark:bg-gray-800/90 shadow-md rounded-lg aspect-[2/1]" />
          </div>
          <div className="w-full h-8 bg-white/95 dark:bg-gray-800/95 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-600">+ Add Supporting Images</span>
          </div>
        </div>
      )
    },
    {
      id: 'gallery-flow',
      name: 'Gallery Grid',
      description: 'Flexible grid for multiple images',
      gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40',
      previewColor: 'bg-emerald-600/10',
      activeColor: 'bg-emerald-600/20',
      preview: (selectedState: boolean) => (
        <div className="grid grid-cols-3 gap-2 w-full aspect-square">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/90 dark:bg-gray-800/90 shadow-md rounded-lg" />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-200
                ${selectedTemplate === template.id 
                  ? 'border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-200 dark:shadow-blue-950/30' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-blue-400 dark:hover:border-blue-600'}
                bg-white dark:bg-gray-900`}
            >
              <div className={`relative w-full mb-6 rounded-lg overflow-hidden
                ${selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-600 dark:ring-blue-500' 
                  : 'ring-1 ring-gray-300 dark:ring-gray-700'}
                transition-all duration-200 bg-gradient-to-br ${template.gradient}`}
              >
                <div className="absolute inset-0 p-4">
                  {template.preview(selectedTemplate === template.id)}
                </div>
                <div className="pt-[100%]" />
                
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-gray-800/95
                               text-xs text-gray-700 dark:text-gray-300 font-medium
                               shadow-md">
                    Add Images
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-200
                  ${selectedTemplate === template.id 
                    ? 'text-blue-700 dark:text-blue-400' 
                    : 'text-gray-900 dark:text-white'}`}>
                  {template.name}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {template.description}
                </p>
              </div>

              {selectedTemplate === template.id && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 text-white 
                              flex items-center justify-center shadow-lg">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 4L5.99992 11.3333L2.66659 8" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="w-full sm:w-auto min-w-[200px] py-5 px-8 rounded-xl
                     bg-[#FF1B7C] hover:bg-[#E3196E] dark:bg-[#FF1B7C] dark:hover:bg-[#E3196E]
                     text-white text-base font-semibold
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 mx-4
                     shadow-xl shadow-[#FF1B7C]/25 dark:shadow-[#FF1B7C]/20"
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