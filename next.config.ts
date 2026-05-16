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
      {
        hostname: "*.ufs.sh",
        pathname: "/f/*",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
