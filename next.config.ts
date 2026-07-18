import type { NextConfig } from 'next';

// GitHub Pages hosts project sites beneath the repository name.
const basePath = process.env.GITHUB_PAGES === 'true' ? '/braille-quiz-game' : '';

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
