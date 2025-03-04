import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import PageWrapper from '@/components/wrapper/page-wrapper';
import ModeToggle from '@/components/mode-toggle';

// export const metadata: Metadata = {
//   metadataBase: new URL('https://titan.codeandcreed.tech'),
//   keywords: [''],
//   title: 'Marketing page',
//   openGraph: {
//     description: 'Put description of the page.',
//     images: [''],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Marketing page',
//     description: 'Put description of the page.',
//     siteId: '',
//     creator: '@_7obaid_',
//     creatorId: '',
//     images: [''],
//   },
// };

export default async function MarketingPage() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center w-full mb-6">
          <div className="w-full flex items-center justify-between px-4 md:px-8 max-w-[900px]">
            <h1 className="scroll-m-20 text-5xl font-bold tracking-tight">Add Content</h1>
            <ModeToggle />
          </div>
        </div>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-lg text-center mt-2 dark:text-gray-400">
          Use this static page to have an explainer video with CTA and some copy. Great for
          marketing your product and getting sales.
        </p>
        <div className="flex gap-2 mt-2">
          <Link href="/dashboard" className="mt-2">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/dashboard" className="mt-2">
            <Button size="lg" variant="outline">
              Get Started
            </Button>
          </Link>
        </div>
      
        <div className="flex flex-col max-w-[900px] w-full items-center mb-[2rem]">
          <article className="w-full mx-auto pb-8">
            <h1 className="text-3xl lg:text-4xl font-bold mb-6">Lorem ipsum dolor sit amet</h1>

            <section className="mb-8">
              <p className="text-md leading-relaxed" spellCheck="false">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <ol className="flex flex-col gap-1 list-decimal ml-8 mb-4">
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <ul className=" flex flex-col gap-1 list-disc ml-8 mb-4">
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
                <li className="mb-2">
                  <strong>Lorem ipsum dolor sit amet:</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mt-10 scroll-m-20 border-b pb-2 mb-3 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Lorem ipsum
              </h2>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-md mb-5 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          </article>
        </div>
      </div>
    </PageWrapper>
  );
}
