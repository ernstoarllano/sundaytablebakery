import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env from the root of the monorepo
config({ path: resolve(__dirname, "../../.env") });

export default defineConfig({
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
