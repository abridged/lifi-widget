/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@collabland/lifi-widget', '@collabland/lifi-wallet-management'],
};

module.exports = nextConfig;
