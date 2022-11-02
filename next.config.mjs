const isProduction = process.env.NODE_ENV === 'production';
const isLocal = process.env.PREFIX === 'local';
const domains = ['image-devlog.juntae.kim'];

const images = isProduction
  ? {
      loader: 'akamai',
      path: '',
      domains,
    }
  : {
      domains,
      path: '/_next/image',
    };
const assetPrefix =
  isProduction && !isLocal ? process.env.NEXT_PUBLIC_SERVICE_URL : undefined;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  productionBrowserSourceMaps: !isProduction,
  swcMinify: true,
  images,
  // assetPrefix,
  compress: true,
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false };
    if (!options.dev) {
      config.devtool = options.isServer ? false : 'hidden-source-map';
    }

    return config;
  },
};

export default nextConfig;
