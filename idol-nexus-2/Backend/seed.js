import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./lib/index.js"; // Adjust this to your DB setup
import { events } from "./db/eventSchema.js";
import { users } from "./db/userSchema.js";
import { tickets } from "./db/ticketSchema.js";
import { calendar } from "./db/calendarSchema.js";
import { payments } from "./db/paymentSchema.js";
import { venues } from "./db/venueSchema.js";
import { orders } from "./db/orderSchema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping schemas to their seed files
const schemaMapping = {
  users: { schema: users, seedFile: "userSeed.json" },
  events: { schema: events, seedFile: "eventSeed.json" },
  venues: { schema: venues, seedFile: "venueSeed.json" },
  tickets: { schema: tickets, seedFile: "ticketSeed.json" },
  orders: { schema: orders, seedFile: "orderSeed.json" },
  calendar: { schema: calendar, seedFile: "calendarSeed.json" },
  payments: { schema: payments, seedFile: "paymentSeed.json" },
};

const seedData = async () => {
  try {
    console.log("Starting database seed...");

    for (const [key, { schema, seedFile }] of Object.entries(schemaMapping)) {
      const filePath = path.join(__dirname, "seed", seedFile);

      if (!fs.existsSync(filePath)) {
        console.warn(`Seed file not found for ${key}: ${filePath}`);
        continue; // Skip missing seed files
      }

      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      console.log(`Seeding ${key} with ${data.length} records...`);
      await db.insert(schema).values(data);
      console.log(`${key} seeded successfully.`);
    }

    console.log("All data seeded successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
};

seedData();