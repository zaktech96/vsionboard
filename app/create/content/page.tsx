'use client';

import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense, ChangeEvent, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { ArrowLeft, Plus, Upload } from 'lucide-react';

const generateUniqueId = () => crypto.randomUUID();

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
  const [selectedImages, setSelectedImages] = useState<{ [key: string]: string }>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [gridCount, setGridCount] = useState(4);
  const [galleryCount, setGalleryCount] = useState(6);

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
      description: 'Upload your own images',
      icon: '🖼️',
      bgColor: 'bg-[#FFE7F1]'
    },
    {
      id: 'text',
      name: 'Add Text',
      description: 'Add inspiring quotes or notes',
      icon: '✍️',
      bgColor: 'bg-[#FFE7F1]'
    },
    {
      id: 'sticker',
      name: 'Stickers',
      icon: '⭐',
      description: 'Choose from our sticker collection',
      bgColor: 'bg-[#FFE7F1]'
    },
    {
      id: 'shape',
      name: 'Shapes',
      icon: '⬡',
      description: 'Add geometric shapes and lines',
      bgColor: 'bg-[#FFE7F1]'
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

  // Add this after the templates object
  const templateEmojis = {
    'career': ['💼', '📈', '🎯', '⭐'],
    'lifestyle': ['🏖️', '🏡', '✈️'],
    'fitness': ['💪', '🥗', '🧘‍♀️', '🏃‍♂️'],
    'blank': ['✨']
  };

  // Update the layoutTemplates object
  const layoutTemplates = {
    'grid-2x2': (
      <div className="grid grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            onClick={() => handleImageClick(`grid-${i}`)}
            className={`${i === 0 ? 'bg-[#FFE7F1]' : i === 1 ? 'bg-[#E8FAE8]' : i === 2 ? 'bg-[#F8E8FF]' : 'bg-[#FFF8E8]'}
                      dark:bg-${i === 0 ? 'pink' : i === 1 ? 'green' : i === 2 ? 'purple' : 'yellow'}-900/20 
                      rounded-2xl border-2 border-dashed border-gray-200/60 
                      hover:border-[#FF1B7C]/20 hover:opacity-90
                      transition-all duration-300 aspect-[4/3]
                      flex items-center justify-center group cursor-pointer
                      relative overflow-hidden`}
          >
            {selectedImages[`grid-${i}`] ? (
              <Image
                src={selectedImages[`grid-${i}`]}
                alt={`Grid image ${i}`}
                fill
                className="object-cover rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
                <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                              flex items-center justify-center bg-white/80">
                  <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#FF1B7C]" />
                </div>
                <span className="text-gray-400 text-sm">Add Image</span>
              </div>
            )}
            {selectedImages[`grid-${i}`] && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                          transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Change Image</span>
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    'featured': (
      <div className="flex flex-col gap-6">
        {/* Featured Main Image */}
        <div 
          onClick={() => handleImageClick('featured-main')}
          className="w-full aspect-[21/9] bg-[#FFE7F1] rounded-2xl border-2 border-dashed border-gray-200/60 
                   hover:border-[#FF1B7C]/20 hover:opacity-90 relative overflow-hidden cursor-pointer"
        >
          {selectedImages['featured-main'] ? (
            <Image
              src={selectedImages['featured-main']}
              alt="Featured image"
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                           flex items-center justify-center bg-white/80">
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-gray-400 mt-2">Add Featured Image</span>
            </div>
          )}
        </div>

        {/* Only show supporting images button if main image exists */}
        {selectedImages['featured-main'] && !selectedImages['featured-1'] && !selectedImages['featured-2'] && (
          <button
            onClick={() => handleImageClick('featured-1')}
            className="w-full py-3 border-2 border-dashed border-gray-200/60 rounded-xl
                     hover:border-[#FF1B7C]/20 hover:bg-[#FFE7F1]/10 transition-all
                     flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Add Supporting Images</span>
          </button>
        )}

        {/* Show supporting images grid if main image exists */}
        {selectedImages['featured-main'] && (selectedImages['featured-1'] || selectedImages['featured-2']) && (
          <div className="grid grid-cols-2 gap-6">
            <div
              onClick={() => handleImageClick('featured-1')}
              className="aspect-[21/9] bg-[#E8FAE8] rounded-2xl border-2 border-dashed border-gray-200/60 
                       hover:border-[#FF1B7C]/20 hover:opacity-90 relative overflow-hidden cursor-pointer"
            >
              {selectedImages['featured-1'] ? (
                <Image
                  src={selectedImages['featured-1']}
                  alt="Supporting image 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                               flex items-center justify-center bg-white/80">
                    <Plus className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-gray-400 mt-2">Add Image</span>
                </div>
              )}
            </div>

            {/* Show second supporting image only if first one exists */}
            {selectedImages['featured-1'] && (
              <div
                onClick={() => handleImageClick('featured-2')}
                className="aspect-[21/9] bg-[#F8E8FF] rounded-2xl border-2 border-dashed border-gray-200/60 
                         hover:border-[#FF1B7C]/20 hover:opacity-90 relative overflow-hidden cursor-pointer"
              >
                {selectedImages['featured-2'] ? (
                  <Image
                    src={selectedImages['featured-2']}
                    alt="Supporting image 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                                 flex items-center justify-center bg-white/80">
                      <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-gray-400 mt-2">Add Image</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    ),
    'masonry': (
      <div className="grid grid-cols-3 gap-6 h-full">
        {['top-left', 'center', 'top-right', 'bottom'].map((cellId, index) => (
          <div
            key={cellId}
            onClick={() => handleImageClick(`masonry-${cellId}`)}
            className={`${index === 1 ? 'row-span-2' : index === 3 ? 'col-span-2' : ''} 
                      bg-[${index === 0 ? '#FFE7F1' : index === 1 ? '#E8FAE8' : index === 2 ? '#F8E8FF' : '#FFF8E8'}]
                      dark:bg-${index === 0 ? 'pink' : index === 1 ? 'green' : index === 2 ? 'purple' : 'yellow'}-900/20 
                      rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden group`}
          >
            {selectedImages[`masonry-${cellId}`] ? (
              <Image
                src={selectedImages[`masonry-${cellId}`]}
                alt="Selected content"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                <span className="text-sm text-gray-400">Add Image</span>
              </div>
            )}
            {selectedImages[`masonry-${cellId}`] && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm">Change Image</span>
              </div>
            )}
          </div>
        ))}
      </div>
    ),
    'dynamic-flow': (
      <div className="grid grid-cols-3 auto-rows-auto gap-6 h-full">
        <div
          onClick={() => handleImageClick('flow-0')}
          className="bg-[#FFE7F1] dark:bg-pink-900/20 
                    rounded-2xl border-2 border-dashed border-gray-200/60 
                    hover:border-[#FF1B7C]/20 hover:opacity-90
                    transition-all duration-300 aspect-[2/1]
                    flex items-center justify-center group cursor-pointer
                    relative overflow-hidden col-span-2"
        >
          {selectedImages['flow-0'] ? (
            <Image
              src={selectedImages['flow-0']}
              alt="Selected content"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                            flex items-center justify-center bg-white shadow-sm
                            group-hover:border-[#FF1B7C]/30 group-hover:shadow-[#FFE7F1]">
                <span className="text-gray-400 text-xl group-hover:text-[#FF1B7C]">+</span>
              </div>
              <span className="text-gray-400 text-sm font-medium group-hover:text-[#FF1B7C]">Add Image</span>
            </div>
          )}
          {selectedImages['flow-0'] && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                          transition-opacity flex items-center justify-center">
              <span className="text-white text-sm">Change Image</span>
            </div>
          )}
        </div>

        <div
          onClick={() => handleImageClick('flow-1')}
          className="bg-[#E8FAE8] dark:bg-green-900/20 
                    rounded-2xl border-2 border-dashed border-gray-200/60 
                    hover:border-[#FF1B7C]/20 hover:opacity-90
                    transition-all duration-300 aspect-[3/4]
                    flex items-center justify-center group cursor-pointer
                    relative overflow-hidden row-span-2"
        >
          {selectedImages['flow-1'] ? (
            <Image
              src={selectedImages['flow-1']}
              alt="Selected content"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                            flex items-center justify-center bg-white shadow-sm
                            group-hover:border-[#FF1B7C]/30 group-hover:shadow-[#FFE7F1]">
                <span className="text-gray-400 text-xl group-hover:text-[#FF1B7C]">+</span>
              </div>
              <span className="text-gray-400 text-sm font-medium group-hover:text-[#FF1B7C]">Add Image</span>
            </div>
          )}
          {selectedImages['flow-1'] && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                          transition-opacity flex items-center justify-center">
              <span className="text-white text-sm">Change Image</span>
            </div>
          )}
        </div>

        <div
          onClick={() => handleImageClick('flow-2')}
          className="bg-[#F8E8FF] dark:bg-purple-900/20 
                    rounded-2xl border-2 border-dashed border-gray-200/60 
                    hover:border-[#FF1B7C]/20 hover:opacity-90
                    transition-all duration-300 aspect-[2/1]
                    flex items-center justify-center group cursor-pointer
                    relative overflow-hidden col-span-2"
        >
          {selectedImages['flow-2'] ? (
            <Image
              src={selectedImages['flow-2']}
              alt="Selected content"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                            flex items-center justify-center bg-white shadow-sm
                            group-hover:border-[#FF1B7C]/30 group-hover:shadow-[#FFE7F1]">
                <span className="text-gray-400 text-xl group-hover:text-[#FF1B7C]">+</span>
              </div>
              <span className="text-gray-400 text-sm font-medium group-hover:text-[#FF1B7C]">Add Image</span>
            </div>
          )}
          {selectedImages['flow-2'] && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                          transition-opacity flex items-center justify-center">
              <span className="text-white text-sm">Change Image</span>
            </div>
          )}
        </div>
      </div>
    ),
    'gallery-flow': (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-4">
          {/* Show only filled cells plus one empty cell */}
          {(() => {
            const filledCells = Object.keys(selectedImages)
              .filter(key => key.startsWith('gallery-'))
              .length;
            const cellsToShow = Math.min(filledCells + 1, 6);
            
            return [...Array(cellsToShow)].map((_, i) => (
              <div
                key={i}
                onClick={() => handleImageClick(`gallery-${i}`)}
                className={`aspect-square rounded-2xl border-2 border-dashed border-gray-200/60 
                         hover:border-[#FF1B7C]/20 hover:bg-[#FFE7F1]/10
                         transition-all duration-300
                         flex items-center justify-center group cursor-pointer relative
                         ${selectedImages[`gallery-${i}`] ? 'bg-[#FFE7F1]' : 'bg-gray-50/50'}`}
              >
                {selectedImages[`gallery-${i}`] ? (
                  <>
                    <Image
                      src={selectedImages[`gallery-${i}`]}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                                transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm">Change Image</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                                flex items-center justify-center bg-white/80">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-[#FF1B7C]" />
                    </div>
                    <span className="text-gray-400 text-sm">Add Image</span>
                  </div>
                )}
              </div>
            ));
          })()}
        </div>
      </div>
    )
  };

  // Helper function for grid colors
  const getGridColor = (index: number) => {
    const colors = ['bg-[#FFE7F1]', 'bg-[#E8FAE8]', 'bg-[#F8E8FF]', 'bg-[#FFF8E8]'];
    return colors[index % colors.length];
  };

  // Content type handlers
  const handleContentTypeClick = (type: string) => {
    setSelectedContentType(type);
    setShowDialog(true);
  };

  const handleAddContent = () => {
    if (selectedContentType === 'image' && selectedImage) {
      if (selectedCell) {
        setSelectedImages(prev => ({
          ...prev,
          [selectedCell]: selectedImage
        }));
      }
    }
    setShowDialog(false);
    setSelectedImage(null);
    setSelectedCell(null);
    setSelectedContentType(null);
  };

  // Dialog content based on content type
  const getDialogContent = () => {
    switch (selectedContentType) {
      case 'image':
        return (
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="sr-only">Add Content</DialogTitle>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 
                               dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 
                               dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
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
  const handleSave = async () => {
    try {
      const boardData = {
        id: searchParams.get('id') || generateUniqueId(),
        name: boardName,
        template: templateId,
        layout: layoutId,
        images: selectedImages, // Make sure this contains the base64 images
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingBoards = JSON.parse(localStorage.getItem('visionBoards') || '[]');
      const updatedBoards = existingBoards.filter((b: any) => b.id !== boardData.id);
      updatedBoards.push(boardData);
      
      localStorage.setItem('visionBoards', JSON.stringify(updatedBoards));
      
      router.push(`/board/${boardData.id}`);
    } catch (error) {
      console.error('Error saving board:', error);
    }
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

  const handleImageClick = (cellId: string) => {
    // If it's a grid cell, check if previous cells are filled
    if (cellId.startsWith('grid-')) {
      const currentIndex = parseInt(cellId.split('-')[1]);
      const previousCells = [...Array(currentIndex)].map((_, i) => `grid-${i}`);
      
      // Check if any previous cells are empty
      const hasEmptyPreviousCells = previousCells.some(cell => !selectedImages[cell]);
      
      if (hasEmptyPreviousCells) {
        // Find first empty cell
        const firstEmptyCell = previousCells.find(cell => !selectedImages[cell]);
        setSelectedCell(firstEmptyCell || cellId);
      } else {
        setSelectedCell(cellId);
      }
    } else {
      setSelectedCell(cellId);
    }
    
    setSelectedContentType('image');
    setShowDialog(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        if (selectedCell) {
          setSelectedImages(prev => ({
            ...prev,
            [selectedCell]: imageUrl
          }));

          // Close dialog after image is added
          setShowDialog(false);
          setSelectedImage(null);
          setSelectedCell(null);
          
          // If we're close to filling all cells, automatically add more
          if (selectedCell.startsWith('gallery-')) {
            const filledCells = Object.keys(selectedImages).filter(k => k.startsWith('gallery-')).length;
            if (filledCells >= galleryCount - 2) {
              setGalleryCount(prev => prev + 3);
            }
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Update handleUploadClick to work with the content type buttons
  const handleUploadClick = () => {
    setSelectedContentType('image');
    setShowDialog(true);
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
                    onClick={() => handleStepClick(step.number)}
                    className={`group flex items-center gap-2 md:gap-3 cursor-pointer relative
                                transition-all duration-200 hover:translate-x-1`}
                  >
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full 
                                    flex items-center justify-center 
                                    text-sm md:text-base font-medium
                                    transition-all duration-300
                                    ${currentStep >= step.number 
                                      ? 'bg-[#FF1B7C] text-white scale-110' 
                                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-[#FF1B7C]/20'}`}
                    >
                      {step.number}
                    </div>
                    <span className={`text-xs md:text-sm font-medium whitespace-nowrap 
                                      transition-colors duration-200
                                      ${currentStep >= step.number 
                                        ? 'text-[#15192C] dark:text-white' 
                                        : 'text-gray-500 dark:text-gray-400 group-hover:text-[#FF1B7C]'}`}
                    >
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
                  <div className={`w-12 h-12 ${type.bgColor} rounded-xl 
                                flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-200`}>
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
          <div className="flex-1 h-full">
            <div 
              className="w-full h-full border-2 border-dashed border-gray-200 dark:border-gray-800 
                        rounded-xl bg-white dark:bg-gray-950 overflow-hidden p-6"
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
              {layoutTemplates[layoutId as keyof typeof layoutTemplates] || layoutTemplates['grid-2x2']}
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
        {getDialogContent()}
      </Dialog>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
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