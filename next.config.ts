import type { NextConfig } from "next";
import { env } from "~/env";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*"],
  compiler: { removeConsole: env.NODE_ENV === "production" },
  experimental: { turbopackFileSystemCacheForDev: true },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
