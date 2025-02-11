import { Button } from '@/components/ui/button';
import PageWrapper from '@/components/wrapper/page-wrapper';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function Cancel() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto px-4 text-center">
        <div className="mb-8">
          <XCircle className="w-16 h-16 text-[#FF1B7C] animate-in fade-in-50 duration-1000" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#15192C] dark:text-white mb-4 animate-in slide-in-from-bottom-3">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 animate-in slide-in-from-bottom-4">
          No worries! You can try again whenever you're ready to unlock all features.
        </p>
        <div className="flex gap-4 animate-in slide-in-from-bottom-5">
          <Link href="/">
            <Button 
              variant="outline" 
              className="px-8 py-6 text-base rounded-xl border-2 hover:bg-[#FFE7F1]/20 hover:border-[#FF1B7C]"
            >
              Back to Home
            </Button>
          </Link>
          <Link href="/pricing">
            <Button 
              className="px-8 py-6 text-base rounded-xl bg-[#FF1B7C] hover:bg-[#FF1B7C]/90 
                       shadow-[0_8px_30px_rgb(230,21,111,0.2)]"
            >
              View Plans
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
