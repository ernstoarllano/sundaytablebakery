import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

// ESM dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root of the monorepo FIRST
config({ path: resolve(__dirname, "../../../.env") });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create postgres client
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing products
  await db.delete(schema.products);

  // Insert sample product
  await db.insert(schema.products).values([
    {
      name: "Classic Sourdough Loaf",
      description: "Our signature sourdough with a perfect crust and tangy flavor. Made with 100% organic flour and naturally fermented for 24 hours.",
      price: "12.00",
      category: "sourdough",
      imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
      available: true,
    },
  ]);

  console.log("✅ Database seeded successfully!");
  await client.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
