import HomePage from '@/components/pages/main/home/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Discover featured posts and the latest blog articles.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home',
    description: 'Discover featured posts and the latest blog articles.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home',
    description: 'Discover featured posts and the latest blog articles.',
  },
};

export default function Page() {
  return <HomePage />;
}
