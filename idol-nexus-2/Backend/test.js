import { db } from "./db/index.js";
import { events } from "./db/eventSchema.js";

async function testConnection() {
  try {
    const data = await db.select().from(events);
    console.log("Connection successful:", data);
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

testConnection();
