import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function EmailSetupNotice() {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Waitlist Disabled</AlertTitle>
      <AlertDescription className="mt-2">
        <p>Email service is not configured. To enable emails:</p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li>Set up a Plunk account</li>
          <li>Add your Plunk secret API key to your .env file</li>
          <li>Enable email in config.ts</li>
        </ol>
        <div className="mt-4">
          <Link href="https://dashboard.useplunk.com/" target="_blank">
            <Button variant="outline" size="sm">
              Go to Plunk Dashboard
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
}
