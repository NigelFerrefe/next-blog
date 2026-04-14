'use client';

import { likePost, PostLikeResponse, unlikePost } from '@/utils/api/blog/post/likes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IPost } from '@/types/blog/post';

type LikeContext = {
  previous?: IPost;
};

export const usePostLike = (slug: string) => {
  const queryClient = useQueryClient();
  const queryKey = ['post-detail', slug];

  const like = useMutation<PostLikeResponse, Error, void, LikeContext>({
    mutationFn: () => likePost(slug),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<IPost>(queryKey);

      if (previous) {
        queryClient.setQueryData<IPost>(queryKey, {
          ...previous,
          has_liked: true,
          likes_count: previous.likes_count + 1,
        });
      }

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData<IPost>(queryKey, context.previous);
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData<IPost>(queryKey, (old) =>
        old
          ? {
              ...old,
              has_liked: data.liked,
              likes_count: data.likes_count,
            }
          : old,
      );

    },
  });

  const unlike = useMutation<PostLikeResponse, Error, void, LikeContext>({
    mutationFn: () => unlikePost(slug),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<IPost>(queryKey);

      if (previous) {
        queryClient.setQueryData<IPost>(queryKey, {
          ...previous,
          has_liked: false,
          likes_count: Math.max(previous.likes_count - 1, 0),
        });
      }

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData<IPost>(queryKey, context.previous);
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData<IPost>(queryKey, (old) =>
        old
          ? {
              ...old,
              has_liked: data.liked,
              likes_count: data.likes_count,
            }
          : old,
      );

    },
  });

  return { like, unlike };
};