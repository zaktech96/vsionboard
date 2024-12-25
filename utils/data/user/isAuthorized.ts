'server only';

import { clerkClient } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import config from '@/tailwind.config';

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string }> => {
  if (!config.payments.enabled) {
    return {
      authorized: true,
      message: 'Payments are disabled',
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
    return {
      authorized: false,
      message: 'Database configuration error',
    };
  }

  const result = await clerkClient.users.getUser(userId);

  if (!result) {
    return {
      authorized: false,
      message: 'User not found',
    };
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      cookies: {
        async get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        async set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        async remove(name: string, options: any) {
          cookieStore.delete(name);
        },
      },
    }
  );

  try {
    const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', userId);

    if (error?.code)
      return {
        authorized: false,
        message: error.message,
      };

    if (data && data[0].status === 'active') {
      return {
        authorized: true,
        message: 'User is subscribed',
      };
    }

    return {
      authorized: false,
      message: 'User is not subscribed',
    };
  } catch (error: any) {
    console.error('Failed to check authorization:', error);
    return {
      authorized: false,
      message: error.message,
    };
  }
};
