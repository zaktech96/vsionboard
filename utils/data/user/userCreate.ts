'server only';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { userCreateProps } from '@/utils/types';

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
    return { error: 'Database configuration error' };
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from('user')
      .insert([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .select();

    console.log('data', data);
    console.log('error', error);

    if (error?.code) return error;
    return data;
  } catch (error: any) {
    console.error('Failed to create user:', error);
    return { error: error.message };
  }
};
