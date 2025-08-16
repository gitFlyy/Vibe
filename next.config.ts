import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Skip type checking during build - types are checked in development
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip ESLint during build - linting is handled separately
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
