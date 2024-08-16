// File: next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove the appDir option as it's no longer needed in Next.js 13+
  },
  images: {
    domains: ['cdn.myanimelist.net', 'via.placeholder.com'],
  },
};

export default nextConfig;