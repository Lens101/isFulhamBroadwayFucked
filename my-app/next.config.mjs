/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clublogos.stadion.io',
        port: '',
        pathname: '/assets/ClubLogos/**',
      },
      {
        protocol: 'https',
        hostname: 'img.chelseafc.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
}

export default nextConfig
