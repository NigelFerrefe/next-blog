import { IPostList } from '@/types/blog/post';
import { formatDateTime } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';

interface ComponentProps {
  post: IPostList;
}

export default function PostCardList({ post }: ComponentProps) {
  return (
    <article className="py-12">
      <div className="group relative max-w-xl">
        <time dateTime={post?.updated_at} className="block text-sm/6 text-gray-600">
          {formatDateTime(post?.updated_at).dateTime}
        </time>
        <h2 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-600 dark:text-dm-txt">
          <Link href={`/blog/post/${post?.slug}`}>
            <span className="absolute inset-0" />
            {post?.title}
          </Link>
        </h2>
        <p className="mt-4 text-sm/6 text-gray-600 dark:text-dm-txt-secondary">{post?.description}</p>
      </div>
      <div className="mt-4 flex">
        <Link
          href={`/public-profile/${post?.user?.username}`}
          className="relative flex gap-x-2.5 text-sm/6 font-semibold text-gray-900 dark:text-dm-txt-secondary"
        >
          <Image
            width={256}
            height={256}
            alt=""
            src={post?.user?.profile_picture?.url}
            className="size-6 flex-none rounded-full bg-gray-50"
          />
          {post?.user?.username}
        </Link>
      </div>
    </article>
  );
}
