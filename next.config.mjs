/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['image-devlog.juntae.kim'],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
