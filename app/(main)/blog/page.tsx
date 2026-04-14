import BlogPage from "@/components/pages/main/blog/blog/BlogPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Explore all the blog articles about web development and programming.',
  alternates: {
    canonical: '/blog/post',
  },
  openGraph: {
    title: 'Blog',
    description: 'Explore all the blog articles about web development and programming.',
    url: '/blog/post',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog',
    description: 'Explore all the blog articles about web development and programming.',
  },
};

export default function Page() {
  return <BlogPage />;
}