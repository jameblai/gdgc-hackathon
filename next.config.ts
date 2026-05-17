import "./lib/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< Updated upstream
  serverExternalPackages: ["@node-rs/argon2"],
=======
>>>>>>> Stashed changes
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
        protocol: "https",
      },
<<<<<<< Updated upstream
      {
        hostname: "*.ufs.sh",
        pathname: "/f/*",
        protocol: "https",
      },
      {
        hostname: "utfs.io",
        pathname: "/f/*",
        protocol: "https",
      },
=======
>>>>>>> Stashed changes
    ],
  },
};

export default nextConfig;
