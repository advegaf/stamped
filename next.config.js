/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // enable react strict mode, helps catch bugs early
  reactStrictMode: true,
  // minify with swc, faster than babel
  swcMinify: true,
  // experimental stuff, might remove later
  experimental: {
    // optimizeCss: true, // Disabled - causing critters module error
  },
  // compress responses, saves bandwidth
  compress: true,
}

module.exports = nextConfig

