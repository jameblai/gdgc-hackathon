import "./lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
