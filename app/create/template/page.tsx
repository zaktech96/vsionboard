'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

const steps = [
  { number: 1, title: 'Name Your Board' },
  { number: 2, title: 'Choose Template' },
  { number: 3, title: 'Choose Layout' },
  { number: 4, title: 'Add Content' },
];

const templates = [
  {
    id: 'career',
    title: 'Career Growth',
    description: 'Plan your professional journey and career milestones',
    icons: ['💼', '📈', '🎯', '✨'],
    color: 'from-blue-500/10 to-indigo-500/10',
    border: 'hover:border-blue-500/50',
    iconBg: 'bg-blue-50',
    buttonBg: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'lifestyle',
    title: 'Dream Lifestyle',
    description: 'Visualize your ideal life and personal goals',
    icons: ['🏖️', '🏠', '✈️', '🌟'],
    color: 'from-pink-500/10 to-rose-500/10',
    border: 'hover:border-pink-500/50',
    iconBg: 'bg-pink-50',
    buttonBg: 'bg-pink-500 hover:bg-pink-600'
  },
  {
    id: 'fitness',
    title: 'Fitness Journey',
    description: 'Track your health and wellness aspirations',
    icons: ['💪', '🥗', '🧘‍♀️', '🏃‍♀️'],
    color: 'from-green-500/10 to-emerald-500/10',
    border: 'hover:border-green-500/50',
    iconBg: 'bg-green-50',
    buttonBg: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'fresh',
    title: 'Start Fresh',
    description: 'Begin with a clean slate and create your own vision',
    icons: ['✨'],
    color: 'from-gray-50 to-white',
    border: 'hover:border-gray-200',
    iconBg: 'bg-white',
    buttonBg: 'bg-[#FF1B7C] hover:bg-[#FF1B7C]/90'
  }
];

// Loading component with proper styling to match the design
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-[200px] animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-[300px] mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-[400px] mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-[32px] bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Separate the content into a client component
function TemplateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardName = searchParams.get('name') || '';
  const currentStep = 2;

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/create/layout?name=${encodeURIComponent(boardName)}&template=${templateId}`);
  };

  const handleStepClick = (stepNumber: number) => {
    if (stepNumber >= currentStep) return;
    
    switch (stepNumber) {
      case 1:
        router.push('/create');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Steps Progress Bar */}
      <div className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="overflow-x-auto -mx-4">
            <div className="flex items-center justify-between min-w-[540px] py-4 px-4">
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
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`h-[2px] w-[80px] mx-4 origin-left ${
                        currentStep > index ? 'bg-[#FF1B7C]' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                    onClick={() => handleStepClick(step.number)}
                    style={{ cursor: step.number < currentStep ? 'pointer' : 'default' }}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-medium
                        ${currentStep >= step.number 
                          ? 'bg-[#FF1B7C] text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                        transition-all duration-300`}
                    >
                      {step.number}
                    </div>
                    <span className={`text-sm font-medium whitespace-nowrap ${
                      currentStep >= step.number 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF1B7C] to-[#FF617C] mb-4">
            Choose a Starting Point
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Select a template for "{boardName}" or start from scratch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleTemplateSelect(template.id)}
              className={`relative group cursor-pointer rounded-[32px] bg-white dark:bg-gray-900 
                         border-2 ${template.id === 'fresh' ? 'border-gray-100' : 'border-gray-100 dark:border-gray-800'} ${template.border}
                         transition-all duration-300 hover:shadow-lg hover:-translate-y-1
                         ${template.id === 'fresh' ? 'shadow-sm' : ''}`}
            >
              <div className={`p-8 h-full flex flex-col`}>
                {/* Template Preview */}
                <div className={`aspect-square mb-8 rounded-[24px] overflow-hidden
                                bg-gradient-to-br ${template.color}
                                flex items-center justify-center gap-3 flex-wrap p-6`}>
                  {template.icons.map((icon, i) => (
                    <motion.div
                      key={i}
                      initial={false}
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 ${template.iconBg} rounded-[16px]
                                flex items-center justify-center text-3xl
                                shadow-sm`}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>

                {/* Template Info */}
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {template.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-base flex-grow">
                  {template.description}
                </p>

                {/* Select Button - Shows on Hover */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    className={`w-full text-white py-6 text-lg ${template.buttonBg}`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    Select Template
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main page component
export default function TemplatePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <TemplateContent />
    </Suspense>
  );
} 