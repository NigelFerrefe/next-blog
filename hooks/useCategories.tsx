'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPagination, get } from '@/lib/api/api.client';
import { PaginatedResponse } from '@/types/pagination';
import { ICategory } from '@/types/blog/category';

interface UseInfiniteCategoriesParams {
  parentSlug?: string;
  search?: string;
  ordering?: 'az' | 'za';
}

export const useInfiniteCategories = ({
  parentSlug,
  search,
  ordering,
}: UseInfiniteCategoriesParams = {}) => {
  const query = useInfiniteQuery({
    queryKey: ['categories-infinite', parentSlug ?? null, search ?? '', ordering ?? ''],
    initialPageParam: 1 as number,
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const params = new URLSearchParams();

      if (parentSlug) params.set('parent_slug', parentSlug);
      if (search) params.set('search', search);
      if (ordering) params.set('ordering', ordering);
      params.set('p', String(pageParam));

      return getPagination<PaginatedResponse<ICategory>>(
        `/api/blog/categories?${params.toString()}`
      );
    },
    getNextPageParam: (lastPage: PaginatedResponse<ICategory>) =>
      lastPage.has_more_pages ? lastPage.next_page ?? undefined : undefined,
  });

  const categories = query.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    ...query,
    categories,
  };
};


export const useCategoriesList = () => {
  const query = useQuery({
    queryKey: ['categories-list'],
    queryFn: async () => {
      return get<ICategory[]>('/api/blog/categories/list');
    },
  });

  return {
    ...query,
    categories: query.data ?? [],
  };
};