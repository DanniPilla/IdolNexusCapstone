import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

config({ path: "../.env" });

// Replace with your Neon connection string
const databaseUrl = process.env.DATABASE_URL;

let db;

try {
  const client = neon(databaseUrl);
  db = drizzle(client);
  console.log("Database Connection Established successfully");
} catch (error) {
  console.error("Error connecting to database", error);
}

export { db };
