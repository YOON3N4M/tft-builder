/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GA_ID: process.env.GA_ID,
    ENV: process.env.ENV,
    ADSENSE_ID: process.env.ADSENSE_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
      },
    ],
  },
};

export default nextConfig;
