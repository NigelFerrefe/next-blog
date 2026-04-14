import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/login',
          '/register',
          '/activate',
          '/forgot-password',
          '/forgot-password-confirm',
          '/resend-activation',

          '/profile',

          '/api',
        ],
      },
    ],
    sitemap: 'https://tudominio.com/sitemap.xml',
  };
}