'use client';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getPagination } from '@/lib/api/api.client';
import { PaginatedResponse } from '@/types/pagination';
import { IPost, IPostList } from '@/types/blog/post';

//  Mis posts (privado)
export const useInfiniteUserPostList = (enabled: boolean) => {
  const query = useInfiniteQuery({
    queryKey: ['posts-user-infinite'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      params.set('page', String(pageParam));

      return getPagination<PaginatedResponse<IPostList>>(`/api/blog/post/?${params.toString()}`);
    },
    getNextPageParam: (lastPage) =>
      lastPage.has_more_pages ? (lastPage.next_page ?? undefined) : undefined,
    enabled, // 👈 solo dispara si toca
  });

  const posts = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    ...query,
    posts,
  };
};

//  Posts públicos de un autor
export const useInfiniteAuthorPosts = (author: string, enabled: boolean) => {
  const query = useInfiniteQuery({
    queryKey: ['author-posts-infinite', author],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      params.set('page', String(pageParam));
      params.set('author', author);

      return getPagination<PaginatedResponse<IPostList>>(`/api/blog/posts?${params.toString()}`);
    },
    getNextPageParam: (lastPage) =>
      lastPage.has_more_pages ? (lastPage.next_page ?? undefined) : undefined,
    enabled: enabled && !!author, // 👈 doble control
  });

  const posts = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    ...query,
    posts,
  };
};

type DeletePostResponse = {
  message: string;
  error?: string;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      const res = await fetch(`/api/blog/post?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });

      const data: DeletePostResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to delete post');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts-user-infinite'] });
    },
  });
};


export const usePostAuthorDetail = (slug?: string, enabled = true) => {
  return useQuery({
    queryKey: ['post-author-detail', slug],
    queryFn: async () => {
      const res = await fetch(
        `/api/blog/post/author/detail?slug=${encodeURIComponent(slug!)}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to load post');
      }

      return data as IPost;
    },
    enabled: enabled && !!slug,
  });
};