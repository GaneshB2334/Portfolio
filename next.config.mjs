/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cover images and in-body images are served from Sanity's CDN.
    // next/image refuses remote hosts that are not listed here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
