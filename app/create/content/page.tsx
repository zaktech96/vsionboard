'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';


function ContentEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardName = searchParams.get('name');
  const templateId = searchParams.get('template');
  const layoutId = searchParams.get('layout');
  const [currentStep, setCurrentStep] = useState(4);
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Content type handlers
  const handleContentTypeClick = (type: string) => {
    setSelectedContentType(type);
    setShowDialog(true);
  };

  const handleAddContent = () => {
    // Here you would add the content to the canvas
    // For now, we'll just close the dialog
    setShowDialog(false);
    setText('');
    setSelectedImage(null);
  };

  // Dialog content based on content type
  const getDialogContent = () => {
    switch (selectedContentType) {
      case 'image':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSelectedImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="mb-4"
              />
              {selectedImage && (
                <div className="w-full aspect-video relative rounded-lg overflow-hidden">
                  <Image src={selectedImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <Button 
                onClick={handleAddContent}
                className="w-full mt-4 bg-[#E6156F] hover:bg-[#D11463]"
              >
                Add Image
              </Button>
            </div>
          </>
        );
      case 'text':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Add Text</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text..."
                className="min-h-[150px] mb-4"
              />
              <Button 
                onClick={handleAddContent}
                className="w-full bg-[#E6156F] hover:bg-[#D11463]"
              >
                Add Text
              </Button>
            </div>
          </>
        );
      case 'sticker':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Choose Sticker</DialogTitle>
            </DialogHeader>
            <div className="p-6 grid grid-cols-4 gap-4">
              {['⭐', '❤️', '🌟', '✨', '🎯', '💫', '🌈', '🎨'].map((sticker) => (
                <button
                  key={sticker}
                  onClick={() => {
                    // Add sticker to canvas
                    handleAddContent();
                  }}
                  className="text-4xl p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800
                           transition-colors duration-200"
                >
                  {sticker}
                </button>
              ))}
            </div>
          </>
        );
      case 'shape':
        return (
          <>
            <DialogHeader>
              <DialogTitle>Choose Shape</DialogTitle>
            </DialogHeader>
            <div className="p-6 grid grid-cols-3 gap-4">
              {['square', 'circle', 'triangle'].map((shape) => (
                <button
                  key={shape}
                  onClick={() => {
                    // Add shape to canvas
                    handleAddContent();
                  }}
                  className="aspect-square rounded-xl border-2 border-gray-200 dark:border-gray-700
                           hover:border-[#E6156F] transition-colors duration-200"
                >
                  {/* Add shape SVG or icon here */}
                </button>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  // Add navigation handler
  const handleSave = () => {
    // Add save logic here
    router.push('/dashboard'); // or wherever you want to go after saving
  };

  // Add function to handle content placement
  const handleContentPlacement = (type: string) => {
    handleContentTypeClick(type);
    // Will expand this later to place content at clicked position
  };

  // Add handleStepClick function
  const handleStepClick = (stepNumber: number) => {
    // Only allow going backwards
    if (stepNumber >= currentStep) return;
    
    switch (stepNumber) {
      case 1:
        router.push('/create');
        break;
      case 2:
        router.push(`/create/template?name=${encodeURIComponent(boardName || '')}`);
        break;
      case 3:
        router.push(`/create/layout?name=${encodeURIComponent(boardName || '')}&template=${templateId}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Steps Header - Full width with proper spacing */}
      <div className="w-full bg-gray-50 dark:bg-gray-950 border-b dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-[#FF1B7C] hover:opacity-80 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center w-full">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1 last:flex-none">
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => handleStepClick(step.number)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${currentStep === step.number 
                        ? 'bg-[#FF1B7C] text-white' 
                        : currentStep > step.number
                          ? 'bg-[#FF1B7C] text-white'
                          : 'bg-white text-gray-400 border-2 border-gray-200'}`}
                    >
                      {step.number}
                    </div>
                    <span className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-[2px] ${
                        currentStep > step.number ? 'bg-[#FF1B7C]' : 'bg-gray-200'
                      }`} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="text-center mb-20">
          <h1 className="text-[50px] font-bold mb-6 tracking-tight
                        text-[#9D3C6B] dark:text-[#B84C82]
                        leading-tight">
            Design Your Vision Board
          </h1>
          <p className="text-[22px] text-gray-500/90 dark:text-gray-400/90 
                        font-normal tracking-wide">
            Click anywhere on the canvas to add content
          </p>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Tools */}
          <div className="w-64 flex-shrink-0 space-y-3">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleContentTypeClick(type.id)}
                className="w-full p-4 rounded-xl text-left transition-all duration-200 
                          bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800
                          hover:scale-[1.02] hover:shadow-lg hover:border-[#FF1B7C]/30
                          group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFE7F1]/0 to-[#FFE7F1]/20 
                              dark:from-[#FF1B7C]/0 dark:to-[#FF1B7C]/10
                              translate-x-[-100%] group-hover:translate-x-[0%] 
                              transition-transform duration-300" />
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#FFE7F1] dark:bg-[#FF1B7C]/10
                                flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-200">
                    <span className="text-2xl group-hover:animate-bounce">{type.icon}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-gray-900 dark:text-gray-100
                                  group-hover:text-[#FF1B7C] transition-colors duration-200">
                      {type.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {type.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Canvas Area */}
          <div className="flex-1">
            <div 
              className="w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl
                       min-h-[80vh] relative bg-white dark:bg-gray-950 overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                console.log('Clicked at:', x, y);
                if (!selectedContentType) {
                  setShowDialog(true);
                }
              }}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(#ddd_1px,transparent_1px),linear-gradient(90deg,#ddd_1px,transparent_1px)] 
                           dark:bg-[linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)]
                           bg-[size:20px_20px] opacity-10" />
              
              {/* Content Grid - Updated to maintain proper sizing */}
              <div className="relative h-full p-6">
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="bg-[#E6F0FF] dark:bg-blue-900/20 rounded-xl flex items-center justify-center aspect-[2/1]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">💼</span>
                    </div>
                  </div>
                  <div className="bg-[#E8FAE8] dark:bg-green-900/20 rounded-xl flex items-center justify-center aspect-[2/1]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📈</span>
                    </div>
                  </div>
                  <div className="bg-[#F8E8FF] dark:bg-purple-900/20 rounded-xl flex items-center justify-center aspect-[2/1]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">🎯</span>
                    </div>
                  </div>
                  <div className="bg-[#FFF8E8] dark:bg-yellow-900/20 rounded-xl flex items-center justify-center aspect-[2/1]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">⭐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="px-6 py-2"
          >
            Back
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 py-2 bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white"
          >
            Save Vision Board
          </Button>
        </div>
      </div>

      {/* Keep existing Dialog component */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          {getDialogContent()}
        </DialogContent>
      </Dialog>
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