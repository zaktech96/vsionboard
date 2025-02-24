'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Add VisionBoard interface
interface VisionBoard {
  id: string;
  name: string;
  template: string;
  layout: string;
  images: {
    [key: string]: string;
  };
  createdAt: string;
}

// Import renderImage helper
const renderImage = (imageUrl: string | undefined, hasError: boolean) => {
  return imageUrl && !hasError ? (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt="Vision board image"
        fill
        className="object-cover"
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 
                    flex items-center justify-center bg-white/80">
        <span className="text-gray-400 text-2xl">+</span>
      </div>
      <span className="text-gray-500 mt-3 font-medium">
        {hasError ? 'Failed to load image' : 'Empty Space'}
      </span>
    </div>
  );
};

// Add renderGrid function
const renderGrid = (board: VisionBoard) => {
  if (!board) return null;
  
  const layout = board.layout;
  if (layout === 'grid-2x2') {
    return (
      <div className="grid grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="aspect-[4/3] rounded-2xl overflow-hidden relative"
          >
            {renderImage(board.images[`grid-${index}`], false)}
          </div>
        ))}
      </div>
    );
  }
  
  // Add other layout cases as needed
  return null;
};

export default function SharePreview() {
  const params = useParams();
  const [board, setBoard] = useState<VisionBoard | null>(null);

  useEffect(() => {
    // Get board data from localStorage
    const savedBoards = JSON.parse(localStorage.getItem('visionBoards') || '[]');
    const currentBoard = savedBoards.find((b: VisionBoard) => b.id === params.id);
    if (currentBoard) setBoard(currentBoard);
  }, [params.id]);

  if (!board) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Preview Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {board.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Created with Vision Board
          </p>
        </div>

        {/* Board Preview */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <Link href="/create">
              <Button className="bg-white/90 hover:bg-white text-black">
                Create Your Own <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl">
            {renderGrid(board)}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Create Your Own Vision Board
          </h2>
          <Link href="/create">
            <Button size="lg" className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 