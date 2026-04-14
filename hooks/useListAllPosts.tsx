'use client';

import { useQuery } from '@tanstack/react-query';
import { getPagination } from '@/lib/api/api.client';
import { PaginatedResponse } from '@/types/pagination';
import { IPostList } from '@/types/blog/post';

type UseListAllPostsProps = {
  page?: number;
  search?: string;
  author?: string;
  sorting?: string;
  ordering?: string;
  is_featured?: boolean;
  categories?: string[];
};

export const useListAllPosts = ({
  page = 1,
  search,
  author,
  sorting,
  ordering,
  is_featured,
  categories = [],
}: UseListAllPostsProps = {}) => {
  const query = useQuery({
    queryKey: ['list-posts', page, search, author, sorting, ordering, is_featured, categories],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));

      if (search) params.set('search', search);
      if (author) params.set('author', author);
      if (sorting) params.set('sorting', sorting);
      if (ordering) params.set('ordering', ordering);
      if (is_featured !== undefined) {
        params.set('is_featured', String(is_featured));
      }

      categories.forEach((category) => {
        if (category) params.append('category', category);
      });

      return getPagination<PaginatedResponse<IPostList>>(
        `/api/blog/home?${params.toString()}`
      );
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    ...query,
    posts: query.data?.results ?? [],
    currentPage: query.data?.current_page ?? 1,
    totalPages: query.data?.total_pages ?? 1,
    totalItems: query.data?.total_items ?? 0,
    perPage: query.data?.per_page ?? 0,
    hasNextPage: query.data?.has_more_pages ?? false,
    nextPage: query.data?.next_page ?? null,
    prevPage: query.data?.prev_page ?? null,
    from: query.data?.from ?? 0,
    to: query.data?.to ?? 0,
  };
};