import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Production optimization options */
  reactStrictMode: true,

  /* Image optimization */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /* Environment variables */
  env: {
    APP_NAME: 'Fragranza Olio',
    APP_DESCRIPTION: 'Premium Perfume & Enterprise Management System',
  },

  /* Security headers */
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],

  /* Redirects for old routes */
  redirects: async () => [
    {
      source: '/login',
      destination: '/',
      permanent: true,
    },
    {
      source: '/dashboard',
      destination: '/enterprise',
      permanent: false,
    },
  ],
};

export default nextConfig;

