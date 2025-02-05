'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

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
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">
            Design Your Vision Board
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Click anywhere on the canvas to add content
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Sidebar - Horizontal scroll on mobile */}
          <div className="w-full lg:w-64 flex lg:flex-col gap-3 
                        overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 
                        scrollbar-hide">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleContentTypeClick(type.id)}
                className="flex-shrink-0 w-[180px] lg:w-full p-3 md:p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <div className="font-medium text-[#15192C] dark:text-white">
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

          {/* Canvas Area - Responsive height */}
          <div className="flex-1 min-h-[400px] lg:min-h-[600px] rounded-xl border-2 border-dashed 
                        border-gray-200 dark:border-gray-800
                        bg-white dark:bg-gray-900
                        overflow-hidden p-6 cursor-pointer"
            onClick={(e) => {
              // Get click coordinates for content placement
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              console.log('Clicked at:', x, y);
              if (selectedContentType) {
                handleContentPlacement(selectedContentType);
              } else {
                setShowDialog(true);
              }
            }}
          >
            {templateId && templates[templateId as keyof typeof templates] ? (
              <div className="relative w-full h-full">
                {templates[templateId as keyof typeof templates]}
                {/* Content items will be positioned absolutely here */}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-600">
                  Template not found: {templateId}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Dialog for content editing */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            {getDialogContent()}
          </DialogContent>
        </Dialog>

        {/* Action Buttons - Stack on mobile */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
          <Button
            onClick={() => router.back()}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Back
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            Save Vision Board
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