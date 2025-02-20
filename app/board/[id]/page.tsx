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
    const layout = board?.layout;

    if (layout === 'gallery-flow') {
      const galleryImages = Object.entries(board?.images || {})
        .filter(([key]) => key.startsWith('gallery-'));
      
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map(([key]) => (
            <div key={key} className="aspect-square rounded-2xl overflow-hidden relative">
              {renderImage(key)}
            </div>
          ))}
        </div>
      );
    }

    if (layout === 'featured-flow') {
      const galleryImages = Object.entries(board?.images || {})
        .filter(([key]) => key.startsWith('gallery-'));
      
      return (
        <div className="flex flex-col gap-6">
          {/* Featured Image */}
          <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden relative">
            {renderImage('featured-main')}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map(([key]) => (
              <div key={key} className="aspect-square rounded-2xl overflow-hidden relative">
                {renderImage(key)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (layout === 'grid-2x2') {
      const gridImages = Object.entries(board?.images || {})
        .filter(([key]) => key.startsWith('grid-'));
      
      return (
        <div className="grid grid-cols-2 gap-6">
          {gridImages.map(([key, src]) => (
            <div
              key={key}
              className={`aspect-[4/3] rounded-2xl overflow-hidden relative 
                        ${key === 'grid-0' ? 'bg-[#FFE7F1]' : 
                          key === 'grid-1' ? 'bg-[#E8FAE8]' : 
                          key === 'grid-2' ? 'bg-[#F8E8FF]' : 'bg-[#FFF8E8]'}`}
            >
              {renderImage(key)}
            </div>
          ))}
        </div>
      );
    }

    switch (layout) {
      case 'masonry':
        return (
          <div className="grid grid-cols-3 gap-6">
            {['top-left', 'center', 'top-right', 'bottom'].map((cellId, index) => (
              <div
                key={cellId}
                className={`${index === 1 ? 'row-span-2' : index === 3 ? 'col-span-2' : ''} 
                          bg-[${index === 0 ? '#FFE7F1' : index === 1 ? '#E8FAE8' : index === 2 ? '#F8E8FF' : '#FFF8E8'}]
                          rounded-2xl overflow-hidden relative aspect-square`}
              >
                {renderImage(`masonry-${cellId}`)}
              </div>
            ))}
          </div>
        );

      case 'featured':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 aspect-[2/1] relative rounded-2xl overflow-hidden">
              {renderImage('featured-main')}
            </div>
            {[1, 2].map((index) => (
              <div key={index} className="aspect-[2/1] relative rounded-2xl overflow-hidden">
                {renderImage(`featured-${index}`)}
              </div>
            ))}
          </div>
        );

      default: // grid-2x2
        return (
          <div className="grid grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-2xl overflow-hidden relative"
              >
                {renderImage(`grid-${index}`)}
              </div>
            ))}
          </div>
        );
    }
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-gray-600 hover:text-[#FF1B7C]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{board?.name}</h1>
                <p className="text-sm text-gray-500">Created on {new Date(board?.createdAt || '').toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => router.push(`/create/content?boardId=${board?.id}`)}
                className="hover:border-[#FF1B7C] hover:text-[#FF1B7C]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Board
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Board Info */}
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{board?.name}</h2>
                <p className="text-gray-500 mt-1">Template: {board?.template}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-500">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Grid Content */}
          <div className="p-8">
            <div id="vision-board" className="max-w-[1200px] mx-auto">
              {renderGrid()}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
            <div className="flex justify-center gap-4">
              <Button 
                onClick={handleDownload}
                className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white px-8 py-6 rounded-xl"
              >
                <Download className="w-5 h-5 mr-3" />
                Download Vision Board
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-6 rounded-xl hover:border-[#FF1B7C] hover:text-[#FF1B7C]"
              >
                <Share2 className="w-5 h-5 mr-3" />
                Share Vision Board
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisionBoard; 