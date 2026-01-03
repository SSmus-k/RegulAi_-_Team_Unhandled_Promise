/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        tailwindcss: require.resolve("tailwindcss"),
      },
    },
  },
};

module.exports = nextConfig;
