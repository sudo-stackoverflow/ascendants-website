/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1pz86fbi4eqgl.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};

/** @type {import('next').NextConfig} */
export default nextConfig;
