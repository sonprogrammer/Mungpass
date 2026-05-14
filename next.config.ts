import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bdisihlyybtmbnriugra.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/**', 
      },
    ],
  },

};

export default nextConfig;
