'use client';

import { RootState } from '@/redux/reducers';
import { IPostList } from '@/types/blog/post';
import { formatDateTime } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DeletePostModal from './DeletePostModal';
import EditPostModal from './EditPostModal';

interface ComponentProps {
  post: IPostList;
}

export default function ListPostCard({ post }: ComponentProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const isOwner = user?.username === post?.user?.username;

  return (
    <article key={post.id} className="w-full rounded-lg p-4">
      {post?.thumbnail?.url ? (
        <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
          <Image
            alt=""
            width={512}
            height={512}
            src={post.thumbnail.url}
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
            priority
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
        </div>
      ) : null}
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={post?.updated_at} className="text-gray-500">
            {formatDateTime(post.updated_at).dateTime}
          </time>
          <Link
            href={`/category/${post?.category?.slug}`}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post?.category?.name}
          </Link>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
            <Link href={`/blog/post/${post?.slug}`}>
              <span className="absolute inset-0" />
              {post?.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm/6 text-gray-600">{post?.description}</p>
        </div>

        {isOwner && (
          <div className="ml-auto flex items-center space-x-4">
            {post?.status === 'draft' ? (
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                Draft
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/10 ring-inset">
                Published
              </span>
            )}
            <button
              onClick={() => {
                setOpenEdit(!openEdit);
              }}
              type="button"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setOpenDelete(!openDelete);
              }}
              type="button"
              className="text-sm font-medium text-rose-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <DeletePostModal open={openDelete} setOpen={setOpenDelete} post={post} />

      <EditPostModal open={openEdit} setOpen={setOpenEdit} slug={post?.slug} />
    </article>
  );
}
