'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '@/utils/api/blog/post/createPost';
import { ICreatePost, IEditPost } from '@/types/blog/post';
import { ToastError } from '@/components/toast/alerts';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePost) => createPost(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts-user-infinite'] });
    },

    onError: (error: Error) => {
      ToastError(error.message);
    },
  });
};

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IEditPost) => updatePost(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts-user-infinite'] });
      queryClient.invalidateQueries({
        queryKey: ['post-author-detail', variables.post_slug],
      });
      queryClient.invalidateQueries({
        queryKey: ['post-detail', variables.post_slug],
      });
    },

    onError: (error: Error) => {
      ToastError(error.message);
    },
  });
};
