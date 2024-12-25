import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function PaymentSetupNotice() {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-8 mt-24">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Payments Not Configured</AlertTitle>
      <AlertDescription className="mt-2">
        <p>Stripe payments are not configured. To enable payments:</p>
        <ol className="list-decimal ml-6 mt-2 space-y-1">
          <li>Set up a Stripe account</li>
          <li>Add your Stripe API keys to your .env file</li>
          <li>Enable payments in config.ts</li>
        </ol>
        <div className="mt-4">
          <Link href="https://dashboard.stripe.com/" target="_blank">
            <Button variant="outline" size="sm">
              Go to Stripe Dashboard
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
} 