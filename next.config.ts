import type { NextConfig } from 'next';

const basePath = process.env.NODE_ENV === 'production' ? '/braille-quiz-game' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;