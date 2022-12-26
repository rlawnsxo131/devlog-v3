/**
 * @TODO
 * 이미지가 너무 과하게 생성될때, 참고
 * deviceSizes: https://nextjs.org/docs/api-reference/next/image#device-sizes
 * imageSizes: https://nextjs.org/docs/api-reference/next/image#image-sizes
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  productionBrowserSourceMaps: !isProduction,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  compress: true,
  webpack: (config, options) => {
    config.resolve.fallback = {
      fs: false,
    };
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'hidden-source-map';
    }

    return config;
  },
};

export default nextConfig;
