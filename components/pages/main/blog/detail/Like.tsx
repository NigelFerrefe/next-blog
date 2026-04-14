'use client';

import { ThumbsUpIcon } from 'lucide-react';
import { usePostLike } from '@/hooks/usePostLike';

type Props = {
  slug: string;
  liked: boolean;
  likesCount: number;
};

const LikeButton = ({ slug, liked, likesCount }: Props) => {
  const { like, unlike } = usePostLike(slug);

  const isLoading = like.isPending || unlike.isPending;

  const handleClick = () => {
    if (liked) {
      unlike.mutate();
    } else {
      like.mutate();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-2 ${
        liked ? 'text-blue-800 dark:text-blue-400' : 'text-gray-700'
      } hover:text-gray-900 disabled:opacity-50 dark:hover:text-gray-200`}
    >
      <ThumbsUpIcon className="h-5 w-5" />
      <span>{likesCount}</span>
    </button>
  );
};

export default LikeButton;
