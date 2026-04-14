'use client';

import { useListAllPosts } from '@/hooks/useListAllPosts';
import FeaturedPostCard from './FeaturedPostCard';
import PostCardList from './PostsCardList';
import ListPostCardLoading from '@/components/loaders/ListPostCardLoading';
import InfoState from '@/components/ui/InfoState';

const FeaturedPosts = () => {
  const { posts, isLoading, isError, refetch } = useListAllPosts({
    is_featured: true,
    sorting: 'newest',
  });

  if (isLoading) {
    return (
      <div className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
          <ListPostCardLoading showImage={false} />
          <div className="space-y-20">
            <ListPostCardLoading showImage={false} />
            <ListPostCardLoading showImage={false} />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <InfoState
        title="Error loading featured post"
        description="Unexpected error has occurred"
        buttonText="Retry"
        onClick={refetch}
      />
    );
  }

  if (posts.length == 0) {
    return <InfoState title="Featured posts not found" buttonText="Go back" />;
  }

  const [featuredPost, ...postsList] = posts;
  const top3Posts = postsList.slice(0, 3);

  return (
    <div className="py-24 sm:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-dm-txt">
          Featured Posts
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover our latest highlighted articles and insights.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 px-6 sm:gap-y-16 lg:grid-cols-2 lg:px-8">
        <FeaturedPostCard post={featuredPost} />

        <div className="mx-auto w-full max-w-2xl border-t border-gray-900/10 pt-12 sm:pt-16 lg:mx-0 lg:max-w-none lg:border-t-0 lg:pt-0">
          <div className="-my-12 divide-y divide-gray-900/10">
            {top3Posts.map((post) => (
              <PostCardList key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
