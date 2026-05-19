import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/user.schema.prisma",
  datasource: {
    url: env("USER_DB_URL"),
  },
});
