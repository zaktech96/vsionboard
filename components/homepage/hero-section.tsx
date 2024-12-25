import Link from 'next/link';
import { Button } from '../ui/button';
import { MacbookScroll } from '../ui/macbook-scroll';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center leading-6 mt-24"
      aria-label="Titan Hero"
    >
      <h1
        className={`${TITLE_TAILWIND_CLASS} scroll-m-20 font-semibold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white`}
      >
        Build & Ship Fast
      </h1>
      <p className="mx-auto max-w-[700px] text-gray-500 text-center mt-8 dark:text-gray-400">
        The Ultimate NextJS Boilerplate for quickly building your Startup - Focus on your Product.
      </p>
      <div className="flex justify-center items-center gap-3 mt-4">
        <Link href="/dashboard" className="mt-5">
          <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
            Purchase Now
          </Button>
        </Link>
      </div>
      <div className="-mt-64">
        <MacbookScroll 
          src={"https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"}
          showGradient
        />
      </div>
      <div className="h-64" />
      <div className="h-64" />
      <div className="h-32" />
    </section>
  );
}
