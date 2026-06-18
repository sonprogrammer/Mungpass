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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error']}
      : false
  }

};

export default nextConfig;
