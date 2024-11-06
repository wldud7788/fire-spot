/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gocamping.or.kr"]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
