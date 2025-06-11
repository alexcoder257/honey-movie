/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org"
      },
      {
        hostname:"avatars.githubusercontent.com"
      },
      {
        hostname:"lh3.googleusercontent.com"
      }
    ],
  },
};

export default nextConfig;
