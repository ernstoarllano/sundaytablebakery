import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
