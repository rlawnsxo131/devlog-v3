/**
 * @TODO 여기 내일 route53 연결이랑 이것저것 작업하고 바꾸자
 */

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
    domains: ['image-devlog.juntae.kim'],
  },
  assetPrefix: process.env.NEXT_PUBLIC_SERVICE_URL,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
