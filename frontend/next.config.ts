import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,   // hides the "N" dev overlay
};

export default nextConfig;