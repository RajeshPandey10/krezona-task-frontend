import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for FTP deployments
  output: "export",

  turbopack: {
    root: "./",
  },
};

export default nextConfig;