import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar/Navbar';
import Footer from '@/components/layout/footer/Footer';
import Providers from '@/providers/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    default: 'Blog App',
    template: '%s | Blog App',
  },
  description: 'Blog about web development, Next.js, and programming',
  keywords: ['blog', 'next.js', 'react', 'desarrollo web', 'programación'],
  authors: [{ name: 'Nigel Ferreres' }],
  creator: 'Nigel Ferreres',
  publisher: 'Nigel Ferreres',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Blog App',
    description: 'Blog about web development, Next.js, and programming',
    url: '/',
    siteName: 'Blog App',
    images: [
      {
        url: '/og-image.png',
        width: 1370,
        height: 849,
        alt: 'Blog App',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog App',
    description: 'Blog about web development, Next.js, and programming',
    images: ['/og-image.png'],
    creator: '@usernametwitter',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
