
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
    // If you know you'll serve SVGs and want <Image/> to load them:
    // dangerouslyAllowSVG: true,
    // contentSecurityPolicy:
    //   "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline'",
  },
};

export default nextConfig;
