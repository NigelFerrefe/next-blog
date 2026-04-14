'use client';

import { IPostList } from '@/types/blog/post';
import PostCard from '@/components/pages/main/blog/PostCard';
import LoadingPostCard from '@/components/loaders/LoadingPostCard';

interface Props {
  posts: IPostList[];
  isLoading: boolean;
}

export default function RelatedPosts({ posts, isLoading }: Props) {
  if (!isLoading && posts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Related posts
        </h2>
        <div className="mt-8 flex gap-8 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-[320px] snap-start">
                  <LoadingPostCard />
                </div>
              ))
            : posts.map((post) => (
                <div key={post.id} className="min-w-[320px] snap-start">
                  <PostCard post={post} />
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}