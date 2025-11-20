import type { NextConfig } from "next";
import { env } from "@/env";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  compiler: {
    removeConsole: env.NODE_ENV === "production",
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
