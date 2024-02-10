/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      // Replace 'domains' with 'remotePatterns' and provide the required hostname property
      remotePatterns: [
          {
              // Specify the hostname
              hostname: 'impact-track.pockethost.io',
              // Optionally, you can specify a protocol (e.g., 'https:')
              // protocol: 'https:',
          }
      ],
  },
};

export default nextConfig;
