import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
config();

const databaseUrl = process.env.DATABASE_URL;
const sql = neon(databaseUrl);
export const db = drizzle(sql);

// import { config } from "dotenv";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// config({ path: "../.env" });

// // Replace with your Neon connection string
// const databaseUrl = process.env.DATABASE_URL;

// if (!databaseUrl) {
//   throw new Error("DATABASE_URL is not defined in environment variables");
// }

// // Create a single database instance
// const sql = neon(databaseUrl);
// export const db = drizzle(sql);

// let db;

// try {
//   const client = neon(databaseUrl);
//   db = drizzle(client);
//   console.log("Database Connection Established successfully");
// } catch (error) {
//   console.error("Error connecting to database", error);
// }

// export { db };
