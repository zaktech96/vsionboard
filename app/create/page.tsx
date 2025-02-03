'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBoard() {
  const router = useRouter();
  const [boardName, setBoardName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Layout' },
    { number: 3, title: 'Add Content' },
  ];

  const placeholders = [
    "Career Growth 2024",
    "Personal Development",
    "Dream Lifestyle",
    "Travel Adventures",
    "Fitness Journey",
    "Business Goals",
  ];

  // Get a random placeholder from the list
  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  const handleNext = () => {
    if (boardName.trim()) {
      router.push(`/create/layout?name=${encodeURIComponent(boardName)}`);
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
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#15192C] dark:text-white mb-3">
            Name Your Vision Board
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Give your vision board a meaningful name that inspires you
          </p>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <Input
              type="text"
              placeholder={randomPlaceholder}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="w-full text-lg py-7 px-6 rounded-2xl border-2 border-gray-200/80 dark:border-gray-800
                       focus:border-[#FF1B7C] dark:focus:border-[#FF1B7C]
                       bg-white dark:bg-gray-900 shadow-sm
                       placeholder:text-gray-400 dark:placeholder:text-gray-600
                       placeholder:italic"
            />
            {boardName && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-[#FFE7F1] flex items-center justify-center">
                  <span className="text-[#FF1B7C] text-sm">✓</span>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!boardName.trim()}
            className="w-full bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white py-7 rounded-2xl
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-base font-medium shadow-lg shadow-[#FF1B7C]/10"
          >
            Continue to Layout →
          </Button>
        </div>
      </div>
    </div>
  );
} 