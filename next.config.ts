import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["storage.googleapis.com"], // <-- Add this
  },
};

export default nextConfig;
