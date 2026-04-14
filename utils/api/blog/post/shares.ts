import { post } from '@/lib/api/api.client';

export type PostShareResponse = {
  shared: boolean;
  shares_count: number;
  platform: string;
};

export const sharePost = (
  slug: string,
  platform: 'facebook' | 'x' | 'linkedin' | 'whatsapp' | 'other'
): Promise<PostShareResponse> => {
  return post<PostShareResponse>(`/api/blog/post/${slug}/share`, {
    platform,
  });
};