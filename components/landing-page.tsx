'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function LandingPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState<'grid' | 'rows' | 'featured'>('grid');
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-[22px] font-bold text-[#FF1B7C]">
            VisionBoard
          </Link>
          <div className="flex items-center gap-4">
            <Button
              className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white rounded-full px-6 py-2 text-[15px]"
            >
              Create Board
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="inline-flex items-center bg-[#FFE7F1] rounded-full px-4 py-1.5 mb-8">
            <span className="text-sm text-[#FF1B7C]">✨ Visualize Your Future</span>
          </div>
          <h1 className="text-[72px] leading-[1.1] font-bold mb-6 text-[#15192C]">
            Where Dreams Take<br />
            <span className="text-[#FF1B7C]">Visual Form</span>
          </h1>
          <p className="text-xl text-[#4B5563] mb-12 max-w-[800px] mx-auto">
            Create stunning vision boards that inspire action. Transform your goals from imagination to reality with our powerful, intuitive design tools.
          </p>
          <Button
            className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white text-base px-6 py-2.5 rounded-full"
            onClick={() => router.push('/create')}
          >
            Start Creating →
          </Button>
        </div>
      </section>

      {/* Board Editor Preview */}
      <section className="px-6 py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto">
          {/* Title for the section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#15192C] mb-4">
              Flexible Layout Options
            </h2>
            <p className="text-[#4B5563] max-w-[600px] mx-auto">
              Choose the perfect layout for your vision board. Grid or rows, customize it your way.
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-12 shadow-xl max-w-[1000px] mx-auto">
            <div className="flex flex-col items-center gap-12">
              {/* Layout Options */}
              <div className="flex gap-4">
                <button
                  className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${selectedLayout === 'grid'
                      ? 'bg-[#FFE7F1] shadow-sm'
                      : 'hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedLayout('grid')}
                >
                  <div className="w-6 h-6 grid grid-cols-2 gap-[2px]">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`${selectedLayout === 'grid'
                            ? 'bg-[#FF1B7C]'
                            : 'bg-gray-300'
                          } rounded-[2px]`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm ${selectedLayout === 'grid' ? 'text-[#FF1B7C]' : 'text-gray-500'}`}>
                    Grid View
                  </span>
                </button>

                <button
                  className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${selectedLayout === 'rows'
                      ? 'bg-[#FFE7F1] shadow-sm'
                      : 'hover:bg-gray-50'
                    }`}
                  onClick={() => setSelectedLayout('rows')}
                >
                  <div className="w-6 h-6 flex flex-col justify-center gap-[3px]">
                    <div className={`${selectedLayout === 'rows' ? 'bg-[#FF1B7C]' : 'bg-gray-300'} h-[4px] rounded-[2px]`}></div>
                    <div className={`${selectedLayout === 'rows' ? 'bg-[#FF1B7C]' : 'bg-gray-300'} h-[4px] rounded-[2px]`}></div>
                  </div>
                  <span className={`text-sm ${selectedLayout === 'rows' ? 'text-[#FF1B7C]' : 'text-gray-500'}`}>
                    Row View
                  </span>
                </button>
              </div>

              {/* Image Grid */}
              <div className="w-full">
                <div className={`grid ${selectedLayout === 'grid'
                    ? 'grid-cols-2 max-w-[800px]'
                    : 'grid-cols-1 max-w-[600px]'
                  } gap-6 mx-auto`}>
                  {[...Array(selectedLayout === 'grid' ? 4 : 2)].map((_, i) => (
                    <div
                      key={i}
                      className={`${selectedLayout === 'grid'
                          ? 'h-[240px]'
                          : 'h-[280px]'
                        } rounded-2xl border-2 border-dashed border-gray-200/60 
                         bg-gradient-to-b from-gray-50/50 to-white
                         hover:border-[#FF1B7C]/20 hover:bg-[#FFE7F1]/10 
                         transition-all duration-300
                         flex items-center justify-center group cursor-pointer`}
                    >
                      <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
                        <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                                      flex items-center justify-center bg-white shadow-sm
                                      group-hover:border-[#FF1B7C]/30 group-hover:shadow-[#FFE7F1]">
                          <span className="text-gray-400 text-xl group-hover:text-[#FF1B7C]">+</span>
                        </div>
                        <span className="text-gray-400 text-sm font-medium group-hover:text-[#FF1B7C]">Add Image</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI-Powered Design */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFE7F1] rounded-2xl mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#15192C] mb-3">
                AI-Powered Design
              </h3>
              <p className="text-[#6B7280] text-[17px] leading-relaxed">
                Smart suggestions and auto-arrangements for perfect layouts
              </p>
            </div>

            {/* Goal Tracking */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFE7F1] rounded-2xl mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#15192C] mb-3">
                Goal Tracking
              </h3>
              <p className="text-[#6B7280] text-[17px] leading-relaxed">
                Track your progress and celebrate milestones
              </p>
            </div>

            {/* Custom Themes */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-[#FFE7F1] rounded-2xl mb-6">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-[22px] font-semibold text-[#15192C] mb-3">
                Custom Themes
              </h3>
              <p className="text-[#6B7280] text-[17px] leading-relaxed">
                Personalize your board with beautiful themes and styles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps Section */}
      <section className="px-6 py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex gap-24">
            {/* Left Side - Steps */}
            <div className="flex-1">
              <h2 className="text-[40px] font-bold text-[#15192C] mb-16">
                Your Vision Board Journey
              </h2>

              <div className="flex flex-col gap-16 relative">
                {/* Connecting line between steps */}
                <div className="absolute left-6 top-6 w-[2px] h-[calc(100%-48px)] bg-gradient-to-b from-[#FFE7F1] to-transparent" />

                {/* Step 1 */}
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 rounded-full bg-[#FFE7F1] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FFE7F1]/30 relative z-10">
                    <span className="text-[#FF1B7C] font-semibold text-lg">1</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-semibold text-[#15192C] mb-3 group-hover:text-[#FF1B7C] transition-colors">
                      Create Your Space
                    </h3>
                    <p className="text-[#6B7280] text-lg leading-relaxed">
                      Start with a blank canvas and choose from multiple layouts that suit your vision
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 rounded-full bg-[#FFE7F1] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FFE7F1]/30 relative z-10">
                    <span className="text-[#FF1B7C] font-semibold text-lg">2</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-semibold text-[#15192C] mb-3 group-hover:text-[#FF1B7C] transition-colors">
                      Add Your Dreams
                    </h3>
                    <p className="text-[#6B7280] text-lg leading-relaxed">
                      Upload images, add text, and customize every element to match your goals
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-8 group">
                  <div className="w-12 h-12 rounded-full bg-[#FFE7F1] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FFE7F1]/30 relative z-10">
                    <span className="text-[#FF1B7C] font-semibold text-lg">3</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-semibold text-[#15192C] mb-3 group-hover:text-[#FF1B7C] transition-colors">
                      Track Progress
                    </h3>
                    <p className="text-[#6B7280] text-lg leading-relaxed">
                      Set deadlines, track achievements, and celebrate your journey to success
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className="flex-1">
              <div className="bg-white rounded-[32px] p-8 shadow-xl relative overflow-hidden group">
                {/* Multiple gradient effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE7F1]/40 via-transparent to-[#FFE7F1]/30 opacity-100 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#FFE7F1]/30 via-transparent to-[#FFE7F1]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="aspect-square rounded-xl border-2 border-dashed border-gray-200/60 
                               bg-white/50 backdrop-blur-sm
                               hover:border-[#FF1B7C]/30 hover:bg-[#FFE7F1]/20
                               group-hover:shadow-lg
                               transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
