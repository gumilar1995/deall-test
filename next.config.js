/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.NEXT_PUBLIC_ENV === "local" ? undefined : "standalone",
};

module.exports = nextConfig;
