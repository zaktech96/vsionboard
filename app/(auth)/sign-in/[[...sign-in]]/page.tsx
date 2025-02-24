'use client';
import PageWrapper from '@/components/wrapper/page-wrapper';
import config from '@/config';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  if (!config?.auth?.enabled) {
    router.back();
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white dark:bg-gray-900 shadow-none",
              headerTitle: "text-[#FF1B7C]",
              headerSubtitle: "text-gray-500",
              socialButtonsBlockButton: "border-gray-200 dark:border-gray-700",
              formButtonPrimary: "bg-[#FF1B7C] hover:bg-[#FF1B7C]/90",
              footerActionLink: "text-[#FF1B7C] hover:text-[#FF1B7C]/90",
            },
          }}
        />
      </div>
    </PageWrapper>
  );
}
