import type { NextConfig } from "next";
import withPWA from '@ducanh2912/next-pwa'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
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
  
   onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // compiler: {
  //   removeConsole: process.env.NODE_ENV === 'production'
  //     ? { exclude: ['error']}
  //     : false
  // }

};

export default nextConfig
// export default withPWA({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
//   register: true,
//   workboxOptions: {
//     skipWaiting: true
//   }
// })(nextConfig);
