'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ArrowLeft } from 'lucide-react';

export default function CreatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const currentStep = 1;

  const steps = [
    { number: 1, title: 'Name Your Board' },
    { number: 2, title: 'Choose Template' },
    { number: 3, title: 'Choose Layout' },
    { number: 4, title: 'Add Content' },
  ];

  const handleContinue = () => {
    if (name.trim()) {
      router.push(`/create/template?name=${encodeURIComponent(name)}`);
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
      <div className="flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Sparkles className="h-12 w-12 text-[#FF1B7C] mb-4" />
            </motion.div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF1B7C] to-[#FF617C] mb-3">
              Name Your Vision Board
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg relative">
              Give your vision board a meaningful name that inspires you
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2
                           bg-gradient-to-r from-[#FF1B7C]/5 to-[#FF617C]/5
                           backdrop-blur-md
                           text-[#FF1B7C]
                           text-sm font-medium py-1.5 px-3.5 rounded-xl
                           border border-[#FF1B7C]/10
                           shadow-[0_4px_20px_rgba(255,27,124,0.15)]
                           max-w-[200px]
                           z-10"
                >
                  <div className="relative flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Make it personal and meaningful
                  </div>
                </motion.div>
              )}
            </p>
          </div>

          <div className="space-y-6">
            <div 
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Input
                type="text"
                placeholder="e.g., Career Growth 2024"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-lg rounded-xl border-2 border-gray-200 
                         focus:border-[#FF1B7C] focus:ring-[#FF1B7C] transition-all duration-200
                         dark:bg-gray-800 dark:border-gray-700"
                onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={!name.trim()}
              className="w-full py-6 text-lg bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white
                       rounded-xl transition-all duration-200 flex items-center justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Template
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 