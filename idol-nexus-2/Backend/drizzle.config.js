import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import path from "path"; // Ensure you import path

console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
  out: "./migrations", // Folder for migrations and generated files
  schema: [
    "./db/userSchema.js",
    "./db/eventSchema.js",
    "./db/ticketSchema.js",
    "./db/calendarSchema.js",
    "./db/orderSchema.js",
    "./db/organiserSchema.js",
    "./db/paymentSchema.js",
    "./db/venueSchema.js",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "", // Database connection URL with fallback
  },
});