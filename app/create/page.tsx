'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';


export default function CreateBoard() {
  const router = useRouter();
  const [boardName, setBoardName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Template' },
    { number: 3, title: 'Choose Layout' },
    { number: 4, title: 'Add Content' },
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
      router.push(`/create/template?name=${encodeURIComponent(boardName)}`);
    }
  };

  // Add handleStepClick function
  const handleStepClick = (stepNumber: number) => {
    // Only allow current step since this is first page
    if (stepNumber !== 1) return;
  };

  return (
    <>
    
      <div className="min-h-screen bg-white dark:bg-gray-950">
        {/* Progress Bar - Make scrollable on mobile */}
        <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
          {/* Add padding and better overflow handling */}
          <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6">
            {/* Improved scrollable container */}
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <div className="flex items-center justify-between min-w-[540px] py-3 md:py-4 px-2 sm:px-0">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    {index === 0 ? (
                      <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-[#FF1B7C] hover:opacity-80
                                 transition-colors duration-200 mr-4"
                        aria-label="Go back"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    ) : (
                      <div 
                        className={`h-[2px] w-[60px] sm:w-[80px] md:w-[100px] mx-2 sm:mx-3 md:mx-4 ${
                          currentStep > index ? 'bg-[#FF1B7C]' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div 
                        onClick={() => handleStepClick(step.number)}
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-medium
                          ${currentStep >= step.number 
                            ? 'bg-[#FF1B7C] text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                          transition-all duration-300`}
                      >
                        {step.number}
                      </div>
                      <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
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
        </div>

        {/* Content section - Added flex container for vertical centering */}
        <div className="flex-1 flex items-center min-h-[calc(100vh-64px)]"> {/* 64px is approx height of progress bar */}
          <div className="w-full max-w-[600px] mx-auto px-4 sm:px-6 py-6">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h1 className="text-2xl sm:text-[28px] md:text-[32px] font-bold text-[#15192C] dark:text-white mb-3 sm:mb-4">
                Name Your Vision Board
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Give your vision board a meaningful name that inspires you
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <Input
                type="text"
                placeholder={randomPlaceholder}
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                className="w-full text-base sm:text-lg py-3 sm:py-4 md:py-6 px-4 sm:px-6 rounded-xl 
                         border-2 border-gray-200/80 dark:border-gray-800"
              />
              <Button
                onClick={handleNext}
                disabled={!boardName.trim()}
                className="w-full py-3 sm:py-4 md:py-6 rounded-xl text-base sm:text-lg font-medium
                         bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300
                         shadow-[0_8px_30px_rgb(230,21,111,0.2)]"
              >
                Continue to Template →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 