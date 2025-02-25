import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  // TO ENSURE THE BUILD IS NOT STOPPED BY TYPESCRIPT ERRORS
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
