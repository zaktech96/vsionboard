export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="w-full bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-[200px] animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-full w-[300px] mx-auto animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-[400px] mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square rounded-[32px] bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
} 