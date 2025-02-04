'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function ContentEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardName = searchParams.get('name');
  const template = searchParams.get('template');
  const [currentStep, setCurrentStep] = useState(3);

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Template' },
    { number: 3, title: 'Choose Layout' },
    { number: 4, title: 'Add Content' },
  ];

  const contentTypes = [
    {
      id: 'image',
      name: 'Upload Image',
      icon: '🖼️',
      description: 'Upload your own images'
    },
    {
      id: 'text',
      name: 'Add Text',
      icon: '✍️',
      description: 'Add inspiring quotes or notes'
    },
    {
      id: 'sticker',
      name: 'Stickers',
      icon: '⭐',
      description: 'Choose from our sticker collection'
    },
    {
      id: 'shape',
      name: 'Shapes',
      icon: '⬡',
      description: 'Add geometric shapes and lines'
    }
  ];

  // Add templates data (you might want to move this to a shared config file later)
  const templates = {
    career: (
      <div className="grid grid-cols-2 gap-3 w-full h-full">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center text-5xl">
          💼
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center text-5xl">
          📈
        </div>
        <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center text-5xl">
          🎯
        </div>
        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800 rounded-xl flex items-center justify-center text-5xl">
          🌟
        </div>
      </div>
    ),
    lifestyle: (
      <div className="grid grid-cols-3 gap-3 w-full h-full">
        <div className="col-span-2 row-span-2 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900 dark:to-pink-800 rounded-xl flex items-center justify-center text-7xl">
          🏖️
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800 rounded-xl flex items-center justify-center text-4xl">
          🏡
        </div>
        <div className="bg-gradient-to-br from-teal-100 to-teal-50 dark:from-teal-900 dark:to-teal-800 rounded-xl flex items-center justify-center text-4xl">
          ✈️
        </div>
      </div>
    ),
    fitness: (
      <div className="grid grid-cols-3 gap-3 w-full h-full">
        <div className="bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900 dark:to-red-800 rounded-xl flex items-center justify-center text-4xl">
          💪
        </div>
        <div className="row-span-2 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center text-4xl">
          🥗
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center text-4xl">
          🧘‍♀️
        </div>
        <div className="col-span-2 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800 rounded-xl flex items-center justify-center text-4xl">
          🏃‍♂️
        </div>
      </div>
    ),
    blank: (
      <div className="w-full h-full rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-gray-400 dark:text-gray-500 text-6xl">✨</div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Progress Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 dark:bg-gray-700" />
            
            {steps.map((step) => (
              <div key={step.number} className="relative z-10 flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 px-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium
                  ${currentStep >= step.number 
                    ? 'bg-[#FF1B7C] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {step.number}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap
                  ${currentStep >= step.number 
                    ? 'text-[#15192C] dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500'}`}>
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
            Add Content to Your Board
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize "{boardName}" with your personal content
          </p>
        </div>

        {/* Content Type Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              className="p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 
                       hover:border-[#E6156F]/40 hover:bg-[#FFE7F1]/10
                       transition-all duration-300 text-center group"
            >
              <div className="text-4xl mb-4">{type.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-[#15192C] dark:text-white
                           group-hover:text-[#E6156F]">
                {type.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {type.description}
              </p>
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="aspect-video w-full rounded-2xl border-2 
                       border-gray-200 dark:border-gray-800 mb-8
                       bg-white dark:bg-gray-900
                       overflow-hidden p-6">
          {template && templates[template as keyof typeof templates] ? (
            templates[template as keyof typeof templates]
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-400 dark:text-gray-600">
                Template not found
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            onClick={() => router.back()}
            className="px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-800
                     hover:border-[#E6156F]/40 hover:bg-[#FFE7F1]/10
                     text-gray-600 dark:text-gray-400"
          >
            Back
          </Button>
          <Button
            onClick={() => {
              // Handle save and continue
            }}
            className="px-8 py-4 rounded-xl bg-[#E6156F] hover:bg-[#D11463]
                     text-white font-medium"
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AddContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContentEditor />
    </Suspense>
  );
} 