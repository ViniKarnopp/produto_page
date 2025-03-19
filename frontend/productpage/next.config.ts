import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
  webpack(config) {
    config.cache = {
      type: 'filesystem',
      compression: 'gzip',
      allowCollectingMemory: true
    };

    return config;
  },
};

export default nextConfig;