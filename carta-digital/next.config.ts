import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.saborurbanochajari.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'lwuuqboohvwbigpcxidg.supabase.co',
      },
    ],
  },
};

export default nextConfig;
