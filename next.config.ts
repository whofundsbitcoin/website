import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Only add basePath in production
  ...(process.env.NODE_ENV === "production" && {
    basePath: "/who-funds-bitcoin-development",
  }),
  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
