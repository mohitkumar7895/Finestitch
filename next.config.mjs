/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/page/About-Us', destination: '/about' },
      { source: '/page/about-us', destination: '/about' },
      { source: '/page/Our-Products', destination: '/products' },
      { source: '/page/our-products', destination: '/products' },
      { source: '/page/Gallery', destination: '/gallery' },
      { source: '/page/gallery', destination: '/gallery' },
      { source: '/page/Contact-Us', destination: '/contact' },
      { source: '/page/contact-us', destination: '/contact' },
    ];
  },
};

export default nextConfig;
