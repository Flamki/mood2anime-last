/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.redd.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'external-preview.redd.it',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_REDDIT_CLIENT_ID: process.env.REDDIT_CLIENT_ID,
    NEXT_PUBLIC_REDDIT_CLIENT_SECRET: process.env.REDDIT_CLIENT_SECRET,
    NEXT_PUBLIC_MAL_CLIENT_ID: process.env.MAL_CLIENT_ID,
  },
};

export default nextConfig;