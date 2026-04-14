import { cache } from 'react';
import type { Metadata } from 'next';
import { serverGetPublic } from '@/lib/api/api.server';
import PostDetailPage from '@/components/pages/main/blog/detail/PostDetailPage';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type PostDetail = {
  id: string;
  user: string;
  title: string;
  description: string;
  content: string;
  thumbnail: {
    url: string;
  } | null;
  keywords?: string;
  slug: string;
  category: {
    name: string;
    title: string;
    slug: string;
  };
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published';
};

const getPost = cache(async (slug: string): Promise<PostDetail | null> => {
  const { data, ok } = await serverGetPublic<PostDetail>(
    `/api/blog/post/${encodeURIComponent(slug)}/`,
  );

  if (!ok || !data) return null;

  return data;
});

function getAbsoluteImageUrl(url?: string | null): string {
  if (!url) return `${SITE_URL}/og-image.png`;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post not found | Blog App',
      description: 'This article does not exist or is not available.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = post.title;
  const description = post.description;
  const keywords = post.keywords
    ? post.keywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
  const canonical = `/blog/post/${post.slug}`;
  const image = getAbsoluteImageUrl(post.thumbnail?.url);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const authorName = post.user;
  const image = getAbsoluteImageUrl(post.thumbnail?.url);
  const canonicalUrl = `${SITE_URL}/blog/post/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [image],
    datePublished: post.created_at,
    dateModified: post.updated_at,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blog App',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: post.category?.title || post.category?.name,
    keywords: post.keywords || '',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PostDetailPage slug={slug} />
    </>
  );
}
