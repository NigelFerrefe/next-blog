'use client';

import { useInfiniteAuthorPosts, useInfiniteUserPostList } from '@/hooks/usePostAuthor';
import ListPostCard from './ListPostCard';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { Button } from '@/components/ui/Button';
import ListPostCardLoading from '@/components/loaders/ListPostCardLoading';

const ListPosts = ({ username, isOwner }: { username: string; isOwner: boolean }) => {
  const privateQuery = useInfiniteUserPostList(isOwner);
  const publicQuery = useInfiniteAuthorPosts(username, !isOwner);

  const { posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = isOwner
    ? privateQuery
    : publicQuery;

  if (isLoading) return <ListPostCardLoading />;

  if (posts.length === 0) {
    return <div>No posts found</div>;
  }
  console.log(posts);

  return (
    <ul>
      {posts.map((post) => (
        <ListPostCard key={post.id} post={post} />
      ))}

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? <LoadingMoon /> : 'Load more'}
        </Button>
      )}
    </ul>
  );
};

export default ListPosts;
