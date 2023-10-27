// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // loader: "custom",
    // loaderFile: "./components/partials/ImageLoader.jsx",
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_TENANT_S3_HOSTNAME,
        port: "",
        pathname: `/**`,
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: `/vi/**`,
      },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].ttf",
          outputPath: "static/fonts/",
          publicPath: "/_next/static/fonts/",
        },
      },
    });
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
};

module.exports = nextConfig;
// module.exports = withBundleAnalyzer(nextConfig);
