import Link from 'next/link';
import { Button } from '../ui/button';
import { MacbookScroll } from '../ui/macbook-scroll';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';
import { Github } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      className="flex flex-col items-center justify-center w-full mt-16 sm:mt-20 md:mt-24"
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
        {/* <Link href="#" className="mt-5">
          <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
            Purchase Now
          </Button>
        </Link> */}
        <Link
            href="https://github.com/ObaidUr-Rahmaan/titan"
            target='_blank'
            className='animate-buttonheartbeat border p-2 rounded-full mt-5 hover:dark:bg-black hover:cursor-pointer'
            aria-label="View NextJS 14 Starter Template on GitHub"
        >
            <Github className='w-5 h-5' aria-hidden="true" />
        </Link>
      </div>
      <div className="hidden md:block -mt-64">
        <MacbookScroll 
          src={"https://utfs.io/f/69a12ab1-4d57-4913-90f9-38c6aca6c373-1txg2.png"}
          showGradient
        />
      </div>
      <div className="hidden md:block h-64" />
      <div className="hidden md:block h-64" />
      <div className="hidden md:block h-32" />
    </section>
  );
}
