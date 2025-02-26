'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

// Add this constant at the top of the file, after the imports
const TITLE_TAILWIND_CLASS = "text-[72px] leading-[1.1] mb-6";

export function LandingPage() {
  const router = useRouter();
  const [selectedLayout, setSelectedLayout] = useState<'grid' | 'rows' | 'featured'>('grid');
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        {/* Primary gradient background - more subtle */}
        <div className="absolute inset-0 bg-white dark:bg-gray-950" />

        {/* Centered circular gradient */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 
                        w-[1200px] h-[1200px] rounded-full 
                        bg-gradient-to-b from-pink-50 via-white to-purple-50 
                        dark:from-gray-900 dark:via-gray-900 dark:to-gray-950
                        opacity-60" />

        {/* Circular gradient overlays - more concentrated */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 
                        w-[800px] h-[800px] rounded-full 
                        bg-[radial-gradient(circle_at_center,#FF1B7C_0%,transparent_70%)]
                        opacity-30 blur-3xl" />
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 
                        w-[600px] h-[600px] rounded-full 
                        bg-[radial-gradient(circle_at_center,purple_0%,transparent_70%)]
                        opacity-25 blur-3xl animate-pulse-slow" />

        {/* Animated blobs - more contained */}
        <div className="absolute top-[20%] left-[35%] w-[500px] h-[500px] rotate-[225deg] animate-blob">
          <div className="absolute w-full h-full bg-gradient-to-r from-pink-400 via-[#FF1B7C] to-purple-500 
                          opacity-30 dark:opacity-20 blur-3xl" />
        </div>
        <div className="absolute top-[30%] right-[35%] w-[500px] h-[500px] rotate-45 animate-blob animation-delay-2000">
          <div className="absolute w-full h-full bg-gradient-to-r from-purple-500 via-[#FF1B7C] to-pink-400 
                          opacity-30 dark:opacity-20 blur-3xl" />
        </div>

        {/* Noise texture - more subtle */}
        <div className="absolute inset-0 bg-grid-small-white/[0.15] dark:bg-grid-small-white/[0.03] opacity-100" />
      </div>

      {/* Glassmorphism header */}
      <header className="sticky top-0 w-full py-4 px-6 backdrop-blur-md bg-white/50 dark:bg-gray-950/50 z-50
                        border-b border-white/10 dark:border-gray-800/10">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <Link href="/" className="text-[22px] font-bold bg-clip-text text-transparent 
                                   bg-gradient-to-r from-[#FF1B7C] to-purple-600">
            VisionBoard
          </Link>
          <div className="flex items-center gap-4">
            <Button className="bg-gradient-to-r from-[#FF1B7C] to-purple-600 hover:opacity-90
                              text-white rounded-full px-6 py-2 text-[15px] shadow-lg shadow-pink-500/25">
              Create Board
            </Button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 
                         hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-24 relative">
        <div className="max-w-[1400px] mx-auto text-center relative">
          {/* Simplified floating badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full 
                          bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10
                          backdrop-blur-sm border border-white/20 dark:border-gray-800/20
                          animate-float shadow-xl shadow-pink-500/10">
            <span className="text-sm bg-gradient-to-r from-[#FF1B7C] to-purple-600 bg-clip-text text-transparent 
                            font-medium">✨ Visualize Your Future</span>
          </div>

          {/* Simplified heading */}
          <h1 className="mt-12 text-[85px] leading-[1.1] font-bold tracking-tight relative">
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF1B7C] via-purple-500 to-[#FF1B7C] 
                            opacity-50 blur-3xl" />
            <span className="relative bg-gradient-to-r from-[#FF1B7C] via-purple-500 to-[#FF1B7C] 
                            bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Where Dreams Take<br />
              Visual Form
            </span>
          </h1>

          {/* Simplified description */}
          <p className="mt-8 text-xl max-w-[800px] mx-auto 
                        opacity-0 animate-fade-in backdrop-blur-sm
                        px-4 py-2 rounded-lg
                        text-gray-600 dark:text-gray-300">
            Create stunning vision boards that inspire action. Transform your goals from imagination 
            to reality with our powerful, intuitive design tools.
          </p>

          {/* Simplified CTA button */}
          <Button
            onClick={() => router.push('/create')}
            className="mt-12 relative group overflow-hidden rounded-full px-8 py-6 text-lg font-medium
                       bg-gradient-to-r from-[#FF1B7C] via-purple-600 to-[#FF1B7C] 
                       hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300
                       hover:scale-105 text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Creating
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
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
      <section className="px-4 sm:px-6 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-24">
            {/* Left Side - Steps */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-[#15192C] mb-8 sm:mb-12 md:mb-16">
                Your Vision Board Journey
              </h2>

              <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 relative">
                {/* Connecting line between steps */}
                <div className="absolute left-6 sm:left-8 top-[28px] w-[2px] h-[calc(100%-56px)] 
                             bg-gradient-to-b from-[#FFE7F1] to-transparent" />

                {/* Step 1 */}
                <div className="flex gap-4 sm:gap-6 relative group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#FFE7F1] rounded-2xl 
                               flex items-center justify-center text-xl sm:text-2xl text-[#FF1B7C]
                               group-hover:bg-[#FF1B7C] group-hover:text-white
                               transition-all duration-300">
                    1
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#15192C] mb-2 sm:mb-3 group-hover:text-[#FF1B7C] transition-colors duration-300">
                      Create Your Space
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Start with a blank canvas and choose from multiple layouts that suit your vision
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 sm:gap-6 relative group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#FFE7F1] rounded-2xl 
                               flex items-center justify-center text-xl sm:text-2xl text-[#FF1B7C]
                               group-hover:bg-[#FF1B7C] group-hover:text-white
                               transition-all duration-300">
                    2
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#15192C] mb-2 sm:mb-3 group-hover:text-[#FF1B7C] transition-colors duration-300">
                      Add Your Dreams
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      Upload images, add text, and customize every element to match your goals
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 sm:gap-6 relative group">
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#FFE7F1] rounded-2xl 
                               flex items-center justify-center text-xl sm:text-2xl text-[#FF1B7C]
                               group-hover:bg-[#FF1B7C] group-hover:text-white
                               transition-all duration-300">
                    3
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#15192C] mb-2 sm:mb-3 group-hover:text-[#FF1B7C] transition-colors duration-300">
                      Track Progress
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed ">
                      Set deadlines, track achievements, and celebrate your journey to success
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Preview */}
            <div className="flex-1 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-900 rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden group">
                {/* Multiple gradient effects */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FFE7F1]/40 via-transparent to-[#FFE7F1]/30 
                              opacity-100 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-bl from-[#FFE7F1]/30 via-transparent to-[#FFE7F1]/20 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Updated preview layout */}
                {selectedLayout === 'featured' ? (
                  <div className="flex flex-col gap-4 relative z-10">
                    {/* Featured large image */}
                    <div className="w-full h-[200px] rounded-xl border-2 border-dashed border-gray-200/60 
                                 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                                 hover:border-[#FF1B7C]/30 hover:bg-[#FFE7F1]/20
                                 dark:hover:bg-[#FFE7F1]/5
                                 group-hover:shadow-lg
                                 transition-all duration-300
                                 flex items-center justify-center" />
                    
                    {/* Supporting images row */}
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(2)].map((_, i) => (
                        <div 
                          key={i}
                          className="aspect-square rounded-xl border-2 border-dashed border-gray-200/60 
                                   bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                                   hover:border-[#FF1B7C]/30 hover:bg-[#FFE7F1]/20
                                   dark:hover:bg-[#FFE7F1]/5
                                   group-hover:shadow-lg
                                   transition-all duration-300
                                   flex items-center justify-center"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  // Original grid/rows layout
                  <div className={`grid ${
                    selectedLayout === 'grid' ? 'grid-cols-2' : 'grid-cols-1'
                  } gap-4 relative z-10`}>
                    {[...Array(selectedLayout === 'grid' ? 4 : 2)].map((_, i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded-xl border-2 border-dashed border-gray-200/60 
                                 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
                                 hover:border-[#FF1B7C]/30 hover:bg-[#FFE7F1]/20
                                 dark:hover:bg-[#FFE7F1]/5
                                 group-hover:shadow-lg
                                 transition-all duration-300
                                 flex items-center justify-center"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
