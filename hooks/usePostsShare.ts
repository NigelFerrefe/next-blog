'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IPost } from '@/types/blog/post';
import { ToastSuccess } from '@/components/toast/alerts';
import { PostShareResponse, sharePost } from '@/utils/api/blog/post/shares';

export const usePostShare = (slug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['post-detail', slug]; // usa tu key real

  const share = useMutation<PostShareResponse, Error, 'facebook' | 'x' | 'linkedin' | 'whatsapp' | 'other'>({
    mutationFn: (platform) => sharePost(slug, platform),

    onSuccess: (data) => {
      // actualizamos cache (por si usas shares_count en UI)
      queryClient.setQueryData<IPost>(queryKey, (old) =>
        old
          ? {
              ...old,
              shares_count: data.shares_count,
            }
          : old,
      );

      ToastSuccess(`Shared on ${data.platform}`);
    },
  });

  return { share };
};