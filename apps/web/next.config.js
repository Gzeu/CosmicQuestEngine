import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@cqe/sdk'],
  experimental: {
    esmExternals: 'loose'
  }
};

export default nextConfig;
