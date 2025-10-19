/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/blog" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/blog/" : undefined,
  // 画像最適化を無効化
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === "production" ? "/blog" : "",
  },
  // 開発環境でのホットリロード設定（Docker用）
  ...(process.env.NODE_ENV === "development" && {
    webpackDevMiddleware: (config: {
      watchOptions: { poll: number; aggregateTimeout: number };
    }) => {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
      return config;
    },
  }),
};

module.exports = nextConfig;
