'use client';

import LoadingPostCard from '@/components/loaders/LoadingPostCard';
import PostCard from '@/components/pages/main/blog/PostCard';
import Pagination from '@/components/ui/Pagination';
import { useListAllPosts } from '@/hooks/useListAllPosts';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import InfoState from '@/components/ui/InfoState';

const CategoriesPage = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams();

  const page = useMemo(() => {
    const value = Number(searchParams?.get('page') ?? '1');
    return Number.isNaN(value) || value < 1 ? 1 : value;
  }, [searchParams]);

  const {
    posts,
    isLoading,
    isError,
    isFetching,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    refetch,
  } = useListAllPosts({
    page,
    categories: [slug],
  });

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    if (newPage <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(newPage));
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  if (isLoading) {
    return (
      <div className="flex items-center py-32 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto space-y-4 text-left">
            <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200" />
            <div className="h-5 w-96 animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 md:mx-0 md:max-w-none md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingPostCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <InfoState
        title="Error loading post"
        description="Unexpected error has occurred"
        buttonText="Retry"
        onClick={refetch}
      />
    );
  }

  if (posts.length == 0) {
    return <InfoState title="Posts not found" buttonText="Go back" />;
  }

  return (
    <div className="flex items-center py-32 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mx-auto text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-gray-900 md:text-2xl dark:text-gray-200">
            Posts for: {slug}
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 md:mx-0 md:max-w-none md:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            nextPage={nextPage}
            prevPage={prevPage}
            isFetching={isFetching}
            onPageChange={updatePage}
          />
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
