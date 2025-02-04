'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

// Create a component to handle the search params
function LayoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardName = searchParams.get('name');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Layout' },
    { number: 3, title: 'Add Content' },
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            {/* Connecting lines */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 dark:bg-gray-700" />
            
            {steps.map((step) => (
              <div key={step.number} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${currentStep >= step.number 
                    ? 'bg-[#FF1B7C] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.number}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap
                  ${currentStep >= step.number 
                    ? 'text-[#15192C] dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#15192C] dark:text-white mb-3">
            Choose Your Vision Board Layout
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Select a template that best represents your vision for "{boardName}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group p-6 rounded-2xl border-2 transition-all duration-300 text-left
                ${selectedTemplate === template.id 
                  ? 'border-[#FF1B7C] bg-[#FFE7F1]/10' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-[#FF1B7C]/30 hover:bg-[#FFE7F1]/5'
                }`}
            >
              <div className="mb-6 aspect-square w-full overflow-hidden rounded-xl border-2 border-dashed
                           border-gray-200/60 dark:border-gray-700/60 p-4
                           group-hover:border-[#FF1B7C]/20">
                {template.preview}
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors
                ${selectedTemplate === template.id 
                  ? 'text-[#FF1B7C]' 
                  : 'text-[#15192C] dark:text-white group-hover:text-[#FF1B7C]'
                }`}>
                {template.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {template.description}
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
         <Button
  onClick={() => {
    if (selectedTemplate && boardName) {
      router.push(`/create/content?name=${encodeURIComponent(boardName)}&template=${selectedTemplate}`);
    }
  }}
  disabled={!selectedTemplate || !boardName}
  className="w-full max-w-[400px] mx-auto
           bg-[#E6156F]
           text-white text-xl font-medium
           py-4 rounded-2xl
           disabled:opacity-50 disabled:cursor-not-allowed
           transition-all duration-300
           shadow-[0_8px_30px_rgb(230,21,111,0.2)]
           hover:shadow-[0_8px_30px_rgb(230,21,111,0.4)]
           hover:bg-[#D11463]
           active:scale-[0.99]"
>
  <div className="flex items-center justify-center gap-3">
    <span>Use This Template</span>
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      className="transition-transform group-hover:translate-x-1"
    >
      <path 
        d="M4.166 10h11.667M11.666 5l4.167 5-4.167 5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  </div>
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