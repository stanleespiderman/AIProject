import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps the thin white lines in the exercise illustrations crisp; 75 is the default.
    qualities: [75, 90],
  },
};

export default nextConfig;
