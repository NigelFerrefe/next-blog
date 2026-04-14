// app/sitemap.ts
import { MetadataRoute } from 'next';
import { serverGetPublic } from '@/lib/api/api.server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

type Post = {
  slug: string;
  updated_at?: string;
  status?: 'draft' | 'published';
};

type Category = {
  slug: string;
  updated_at?: string;
};

async function getPosts(): Promise<Post[]> {
  const { data, ok } = await serverGetPublic<any>(
    `/api/blog/posts/`
  );

  if (!ok || !data) return [];

  const posts = data.results ?? data;

  // 🔥 importante: solo publicados
  return posts.filter((post: Post) => post.status === 'published');
}

async function getCategories(): Promise<Category[]> {
  const { data, ok } = await serverGetPublic<any>(
    `/api/blog/categories/list/`
  );

  if (!ok || !data) return [];

  return data.results ?? data;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog/post`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/post/${post.slug}`,
    lastModified: post.updated_at
      ? new Date(post.updated_at)
      : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    lastModified: cat.updated_at
      ? new Date(cat.updated_at)
      : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}