'use client';
import { useQuery } from '@tanstack/react-query';
import { getPagination } from '@/lib/api/api.client';
import { PaginatedResponse } from '@/types/pagination';
import { ICategory } from '@/types/blog/category';

interface UseCategoriesParams {
  parentId?: string;
  search?: string;
  ordering?: 'az' | 'za';
  page?: number;
}

export const useCategories = ({
  parentId,
  search,
  ordering,
  page = 1,
}: UseCategoriesParams = {}) => {
  const params = new URLSearchParams();
  if (parentId) params.set('parent_id', parentId);
  if (search) params.set('search', search);
  if (ordering) params.set('ordering', ordering);
  params.set('p', String(page));

  return useQuery({
    queryKey: ['categories', parentId, search, ordering, page],
    queryFn: () => getPagination<PaginatedResponse<ICategory>>(`/api/blog/categories?${params.toString()}`),
  });
};