import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
config({ path: "./Backend/.env" });
// Replace with your Neon connection string
const databaseUrl = process.env.DATABASE_URL;

console.log("Loaded environment variable DATABASE_URL:", databaseUrl);
const client = neon(databaseUrl);
console.log("Client:", client);
console.log("Database URL:", databaseUrl);
export const db = drizzle(client);
