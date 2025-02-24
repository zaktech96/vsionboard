'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Share2, Download, Edit, ArrowLeft, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

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

const SOCIAL_SHARE_URLS = {
  twitter: (url: string, text: string) => 
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  facebook: (url: string) => 
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  linkedin: (url: string) => 
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  pinterest: (url: string, media: string) => 
    `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}`
};

const ShareMenu = ({ onShare, isOpen, setIsOpen }: {
  onShare: (platform: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => (
  <div className="relative">
    {isOpen && (
      <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50">
        <div className="p-1" role="menu">
          {[
            { name: 'Twitter', icon: '𝕏' },
            { name: 'Facebook', icon: 'f' },
            { name: 'LinkedIn', icon: 'in' },
            { name: 'Pinterest', icon: '📌' },
          ].map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => {
                onShare(name.toLowerCase());
                setIsOpen(false);
              }}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 
                       hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              role="menuitem"
            >
              <span className="w-5 text-center mr-2">{icon}</span>
              {name}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

const renderImage = (
  key: string, 
  images: Record<string, string>,
  imageErrors: Record<string, boolean>,
  setImageErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const imageUrl = images[key];
  return imageUrl && !imageErrors[key] ? (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt="Vision board image"
        fill
        className="object-cover"
        priority={key === 'featured-main' || key === 'grid-0'}
        loading={key === 'featured-main' || key === 'grid-0' ? 'eager' : 'lazy'}
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={() => setImageErrors((prev: Record<string, boolean>) => ({ ...prev, [key]: true }))}
      />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-12 h-12 rounded-xl border-2 border-dashed border-gray-200 
                    flex items-center justify-center bg-white/80">
        <span className="text-gray-400 text-2xl">+</span>
      </div>
      <span className="text-gray-500 mt-3 font-medium">
        {imageErrors[key] ? 'Failed to load image' : 'Empty Space'}
      </span>
    </div>
  );
};

// Memoize the grid components to prevent unnecessary re-renders
const GridLayout = memo(({ 
  layout, 
  images, 
  imageErrors, 
  setImageErrors 
}: { 
  layout: string; 
  images: Record<string, string>;
  imageErrors: Record<string, boolean>;
  setImageErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {[0, 1, 2, 3].map((index) => (
        <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden relative">
          {renderImage(`grid-${index}`, images, imageErrors, setImageErrors)}
        </div>
      ))}
    </div>
  );
});

function VisionBoard() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [board, setBoard] = useState<VisionBoard | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

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

  const handleShare = async (platform: string) => {
    try {
      // Generate image first
      const visionBoard = document.getElementById('vision-board');
      if (!visionBoard) {
        throw new Error('Vision board element not found');
      }

      const canvas = await html2canvas(visionBoard, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9);
      const shareText = `Check out my vision board: ${board?.name}`;

      switch (platform.toLowerCase()) {
        case 'twitter':
          window.open(SOCIAL_SHARE_URLS.twitter('', shareText), '_blank');
          break;
        case 'facebook':
          // Facebook requires server-side image hosting, so we'll share without image
          window.open(SOCIAL_SHARE_URLS.facebook(''), '_blank');
          break;
        case 'linkedin':
          window.open(SOCIAL_SHARE_URLS.linkedin(''), '_blank');
          break;
        case 'pinterest':
          window.open(SOCIAL_SHARE_URLS.pinterest('', imageUrl), '_blank');
          break;
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share vision board');
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      const visionBoard = document.getElementById('vision-board');
      if (!visionBoard) {
        throw new Error('Vision board element not found');
      }

      // Pre-load images
      const imageElements = visionBoard.querySelectorAll('img');
      await Promise.all(
        Array.from(imageElements).map((img) => {
          const imgElement = img as HTMLImageElement;
          if (imgElement.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            imgElement.onload = () => resolve();
            imgElement.onerror = () => {
              console.warn(`Failed to load image: ${imgElement.src}`);
              resolve();
            };
          });
        })
      );

      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(visionBoard, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true,
        backgroundColor: '#ffffff',
        imageTimeout: 30000,
        onclone: (doc) => {
          const element = doc.getElementById('vision-board');
          if (element) {
            element.style.backgroundColor = '#ffffff';
            element.classList.add('downloading');
          }
        }
      });

      const compressedImage = canvas.toDataURL('image/jpeg', 0.9);

      const link = document.createElement('a');
      link.download = `vision-board-${new Date().toISOString()}.jpg`;
      link.href = compressedImage;
      link.click();

      setDownloadProgress(100);
      toast.success('Vision board downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error(`Failed to download: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
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
              {renderImage(key, board?.images || {}, imageErrors, setImageErrors)}
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
            {renderImage('featured-main', board?.images || {}, imageErrors, setImageErrors)}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map(([key]) => (
              <div key={key} className="aspect-square rounded-2xl overflow-hidden relative">
                {renderImage(key, board?.images || {}, imageErrors, setImageErrors)}
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
              {renderImage(key, board?.images || {}, imageErrors, setImageErrors)}
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
                {renderImage(`masonry-${cellId}`, board?.images || {}, imageErrors, setImageErrors)}
              </div>
            ))}
          </div>
        );

      case 'featured':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 aspect-[2/1] relative rounded-2xl overflow-hidden">
              {renderImage('featured-main', board?.images || {}, imageErrors, setImageErrors)}
            </div>
            {[1, 2].map((index) => (
              <div key={index} className="aspect-[2/1] relative rounded-2xl overflow-hidden">
                {renderImage(`featured-${index}`, board?.images || {}, imageErrors, setImageErrors)}
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
                {renderImage(`grid-${index}`, board?.images || {}, imageErrors, setImageErrors)}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#FF1B7C]" />
            <p className="text-gray-500">Loading your vision board...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="max-w-screen-2xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-[#FF1B7C]"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div className="flex items-center space-x-2">
                  <Button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    className="bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 text-white"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </Button>
                  <Button 
                    onClick={() => setIsShareMenuOpen(!isShareMenuOpen)} 
                    variant="outline"
                    className="border-[#FF1B7C] text-[#FF1B7C] hover:bg-[#FF1B7C]/10"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ShareMenu 
            isOpen={isShareMenuOpen}
            setIsOpen={setIsShareMenuOpen}
            onShare={handleShare}
          />
          <div id="vision-board" className="max-w-[1200px] mx-auto p-8">
            <GridLayout 
              layout={board?.layout || ''} 
              images={board?.images || {}} 
              imageErrors={imageErrors}
              setImageErrors={setImageErrors}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default VisionBoard;
