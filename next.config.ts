import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingIncludes: {
    '/*/resume/pdf': ['./src/lib/resume-pdf/fonts/*.ttf', './src/lib/resume-pdf/assets/*.jpg'],
  },
  allowedDevOrigins: ['192.168.1.5'],
  experimental: {
    instantInsights: { validationLevel: 'manual-warning' },
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
