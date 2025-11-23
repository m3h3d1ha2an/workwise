import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";
import { env } from "./src/env";

const config = defineConfig({
  schema: path.join("prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});

export default config;
