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
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          {board.layout === 'dynamic-flow' ? (
            <div className="grid grid-cols-3 auto-rows-auto gap-6 max-w-[1000px] mx-auto">
              <div className="col-span-2 aspect-[2/1] rounded-2xl overflow-hidden relative bg-[#FFE7F1] dark:bg-pink-900/20">
                {board.images['flow-0'] ? (
                  <Image
                    src={board.images['flow-0']}
                    alt="Vision board image 1"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                                  flex items-center justify-center bg-white shadow-sm">
                      <span className="text-gray-400 text-xl">+</span>
                    </div>
                    <span className="text-gray-400 text-sm font-medium">Empty</span>
                  </div>
                )}
              </div>

              <div className="row-span-2 aspect-[3/4] rounded-2xl overflow-hidden relative bg-[#E8FAE8] dark:bg-green-900/20">
                {/* Similar structure for flow-1 */}
              </div>

              <div className="col-span-2 aspect-[2/1] rounded-2xl overflow-hidden relative bg-[#F8E8FF] dark:bg-purple-900/20">
                {/* Similar structure for flow-2 */}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 max-w-[1000px] mx-auto">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`${index === 0 ? 'bg-[#FFE7F1]' : index === 1 ? 'bg-[#E8FAE8]' : index === 2 ? 'bg-[#F8E8FF]' : 'bg-[#FFF8E8]'}
                            dark:bg-${index === 0 ? 'pink' : index === 1 ? 'green' : index === 2 ? 'purple' : 'yellow'}-900/20 
                            rounded-2xl border-2 border-gray-100 dark:border-gray-800
                            aspect-[4/3] overflow-hidden relative group shadow-sm`}
                >
                  {board.images[`grid-${index}`] ? (
                    <Image
                      src={board.images[`grid-${index}`]}
                      alt={`Vision board image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="w-10 h-10 rounded-xl border-2 border-dashed border-gray-200/60 
                                    flex items-center justify-center bg-white shadow-sm">
                        <span className="text-gray-400 text-xl">+</span>
                      </div>
                      <span className="text-gray-400 text-sm font-medium">Empty</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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