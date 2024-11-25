import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
config();
// Replace with your Neon connection string
const databaseUrl = process.env.DATABASE_URL;

const client = neon(databaseUrl, {
  ssl: true,
});
console.log("Database URL:", process.env.DATABASE_URL);
console.log("Database URL:", databaseUrl);
export const db = drizzle(client);
