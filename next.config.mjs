/**
 * @TODO 여기 내일 route53 연결이랑 이것저것 작업하고 바꾸자
 */
const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? '.' : '.';

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
  assetPrefix,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
