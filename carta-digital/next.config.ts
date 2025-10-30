import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.saborurbanochajari.com.ar",
      },
    ],
  },
};

export default nextConfig;
