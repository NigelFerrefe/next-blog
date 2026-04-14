import { post, del } from '@/lib/api/api.client';

export type PostLikeResponse = {
  liked: boolean;
  likes_count: number;
};

export const likePost = (slug: string): Promise<PostLikeResponse> =>
  post<PostLikeResponse>(`/api/blog/post/${slug}/like`, {});

export const unlikePost = (slug: string): Promise<PostLikeResponse> =>
  del<PostLikeResponse>(`/api/blog/post/${slug}/like`);