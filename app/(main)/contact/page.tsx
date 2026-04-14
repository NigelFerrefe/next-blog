import ContactPage from '@/components/pages/main/blog/contact/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
  description: 'Discover featured posts and the latest blog articles.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Contact',
    description: 'Discover featured posts and the latest blog articles.',
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact',
    description: 'Discover featured posts and the latest blog articles.',
  },
};

export default function Page() {
  return <ContactPage />;
}
