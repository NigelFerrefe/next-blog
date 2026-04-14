import { cache } from 'react';
import type { Metadata } from 'next';
import { serverGetPublic } from '@/lib/api/api.server';
import CategoriesPage from '@/components/pages/main/blog/categories/CategoriesPage';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type Category = {
  name: string;
  title: string;
  description: string;
  slug: string;
  thumbnail?: {
    url: string;
  };
};

const getCategory = cache(async (slug: string): Promise<Category | null> => {
  const { data, ok } = await serverGetPublic<Category>(
    `/api/blog/categories/${encodeURIComponent(slug)}/`,
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
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Category not found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = category.name;
  const description = category.description || category.title;
  const canonical = `/blog/category/${category.slug}`;
  const image = getAbsoluteImageUrl(category.thumbnail?.url);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
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
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <CategoriesPage slug={slug} />;
}
