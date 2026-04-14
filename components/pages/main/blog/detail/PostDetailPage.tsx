'use client';

import Header from '@/components/pages/main/blog/detail/Header';
import TableOfContents from '@/components/pages/main/blog/detail/TableOfContents';
import RelatedPosts from '@/components/pages/main/blog/detail/RelatedPosts';
import { useListAllPosts } from '@/hooks/useListAllPosts';
import { usePostDetail } from '@/hooks/usePostDetail';
import { useMemo } from 'react';
import EmailSubscribe from '@/components/pages/main/blog/detail/EmailSubscribe';
import InfoState from '@/components/ui/InfoState';
import LoadingPostDetailPage from '@/components/loaders/PostCardDetailLoading';
import LikeButton from '@/components/pages/main/blog/detail/Like';
import ShareButton from '@/components/pages/main/blog/detail/Share';

export default function PostDetailPage({ slug }: { slug: string }) {
  const { data: post, isLoading, isError } = usePostDetail(slug);

  const categorySlug = useMemo(
    () => [post?.category?.slug].filter(Boolean) as string[],
    [post?.category?.slug],
  );

  const {
    posts,
    isLoading: isLoadingRelated,
    refetch,
  } = useListAllPosts({ categories: categorySlug });

  const relatedPosts = useMemo(
    () => posts.filter((p) => p.slug !== post?.slug),
    [posts, post?.slug],
  );

  if (isLoading) return <LoadingPostDetailPage />;
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
  if (!post) return <InfoState title="Posts not found" buttonText="Go back" />;

  return (
    <div>
      <Header post={post} />
      <div className="block lg:relative lg:flex lg:flex-wrap">
        {post?.headings?.length > 0 && (
          <aside className="mx-auto w-full max-w-3xl px-8 md:top-0 lg:sticky lg:mx-0 lg:h-full lg:w-1/4 lg:max-w-none lg:px-0">
            <TableOfContents headings={post.headings} />
          </aside>
        )}
        <div className="mx-auto w-full max-w-3xl px-8 leading-7 text-gray-700 lg:w-2/2 lg:px-2 xl:w-1/2">
          <div className="flex items-center space-x-2" />
          <div className="flex flex-row space-x-5">
            <LikeButton slug={post.slug} liked={post.has_liked} likesCount={post.likes_count} />
            <ShareButton slug={slug} />
          </div>
          <article className="prose prose-lg dark:prose-invert mx-auto w-full max-w-3xl px-8 lg:w-3/4">
            <p className="mt-6 text-xl leading-8 text-gray-600">{post.description}</p>
            <div
              className="mt-10 max-w-2xl text-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
        <div className="hidden w-full md:top-0 xl:sticky xl:flex xl:h-full xl:w-1/4">
          <EmailSubscribe />
        </div>
      </div>
      <RelatedPosts posts={relatedPosts} isLoading={isLoadingRelated} />
    </div>
  );
}
