'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Share2, Download, Edit, ArrowLeft } from 'lucide-react';

function VisionBoard() {
  const router = useRouter();
  const params = useParams();
  const [board, setBoard] = useState<{
    id: string;
    name: string;
    template: string;
    layout: string;
    images: { [key: string]: string };
    createdAt: string;
  } | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulating API fetch
    setBoard({
      id: params.id as string,
      name: "My Vision Board",
      template: "career",
      layout: "grid-2x2",
      images: {
        'grid-0': '/path/to/image1.jpg',
        'grid-1': '/path/to/image2.jpg',
        'grid-2': '/path/to/image3.jpg',
        'grid-3': '/path/to/image4.jpg'
      },
      createdAt: new Date().toISOString()
    });
  }, [params.id]);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleShare = () => {
    // Implement sharing functionality
    console.log('Share board:', board.id);
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download board:', board.id);
  };

  const handleEdit = () => {
    router.push(`/create/content?name=${board.name}&template=${board.template}&layout=${board.layout}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 aspect-[4/3] relative overflow-hidden">
          {/* Render the board based on layout */}
          <div className="grid grid-cols-2 gap-6 h-full">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden relative group"
              >
                {board.images[`grid-${index}`] && (
                  <Image
                    src={board.images[`grid-${index}`]}
                    alt={`Vision board image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Creation Date */}
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Created on {new Date(board.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  return <VisionBoard />;
} 