import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
config({ path: "./Backend/.env" });
// Replace with your Neon connection string
const databaseUrl = process.env.DATABASE_URL;

console.log(
  "Loaded environment variable DATABASE_URL:",
  process.env.DATABASE_URL
);
const client = neon(databaseUrl, {
  ssl: true,
});
console.log("Database URL:", databaseUrl);
export const db = drizzle(client);
