/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
