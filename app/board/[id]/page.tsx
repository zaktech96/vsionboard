'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Share2, Download, Edit, ArrowLeft, Loader2 } from 'lucide-react';

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

function VisionBoard() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [board, setBoard] = useState<VisionBoard | null>(null);

  useEffect(() => {
    try {
      const savedBoards = JSON.parse(localStorage.getItem('visionBoards') || '[]');
      const currentBoard = savedBoards.find((b: VisionBoard) => b.id === params.id);
      
      if (currentBoard) {
        setBoard(currentBoard);
      } else {
        setError('Board not found');
      }
    } catch (err) {
      setError('Failed to load board');
      console.error('Error loading board:', err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  const handleShare = () => {
    // Implement sharing functionality
    console.log('Share board:', board?.id);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download board:', board?.id);
  };

  const handleEdit = () => {
    if (board) {
      router.push(`/create/content?name=${board.name}&template=${board.template}&layout=${board.layout}`);
    }
  };

  const renderGrid = () => {
    const layout = board?.layout || 'grid-2x2';
    
    if (layout === 'featured') {
      return (
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 aspect-[2/1] bg-[#FFE7F1] rounded-2xl overflow-hidden">
            {renderImage('featured-main')}
          </div>
          <div className="bg-[#E8FAE8] rounded-2xl aspect-[4/3] overflow-hidden">
            {renderImage('featured-1')}
          </div>
          <div className="bg-[#F8E8FF] rounded-2xl aspect-[4/3] overflow-hidden">
            {renderImage('featured-2')}
          </div>
        </div>
      );
    }

    // Default grid-2x2 layout
    return (
      <div className="grid grid-cols-2 gap-6">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`${
              index === 0 ? 'bg-[#FFE7F1]' : 
              index === 1 ? 'bg-[#E8FAE8]' : 
              index === 2 ? 'bg-[#F8E8FF]' : 'bg-[#FFF8E8]'
            } rounded-2xl aspect-[4/3] overflow-hidden relative`}
          >
            {renderImage(`grid-${index}`)}
          </div>
        ))}
      </div>
    );
  };

  const renderImage = (key: string) => {
    const imageUrl = board?.images[key];
    return imageUrl ? (
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
        <span className="text-gray-500 mt-3 font-medium">Empty Space</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF1B7C]" />
        <span className="ml-2 text-lg">Loading your vision board...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push('/create')} className="bg-[#FF1B7C]">
          Create New Board
        </Button>
      </div>
    );
  }

  if (!board) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="w-full bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-[#FF1B7C] hover:opacity-80 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {board.name}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={handleEdit}
                size="sm"
                className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Board
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden">
          {/* Board Title */}
          <div className="p-8 border-b border-gray-100 dark:border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {board.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Created on {new Date(board.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Vision Board Grid */}
          <div className="p-8">
            {renderGrid()}
          </div>

          {/* Download & Share Section */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleDownload}
                className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white px-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Board
              </Button>
              <Button 
                variant="outline"
                onClick={handleShare}
                className="px-8"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Board
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionBoard; 