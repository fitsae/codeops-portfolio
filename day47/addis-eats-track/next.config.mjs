// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing settings here:
  // cacheComponents: false, // if you added it for Day 47

  images: {
    remotePatterns: [
      // ... keep any existing patterns you already had ...
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/wikipedia/**", // This covers the /thumb/ path too
      },
    ],
  },
};

export default nextConfig;
