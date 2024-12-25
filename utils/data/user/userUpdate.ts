'server only';
import { userUpdateProps } from '@/utils/types';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const userUpdate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userUpdateProps) => {
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
      .update([
        {
          email,
          first_name,
          last_name,
          profile_image_url,
          user_id,
        },
      ])
      .eq('email', email)
      .select();

    if (data) return data;
    if (error) return error;
  } catch (error: any) {
    console.error('Failed to update user:', error);
    return { error: error.message };
  }
};
