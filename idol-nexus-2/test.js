import { db } from "./src/db/index.js";
import { events } from "./src/db/eventSchema.js";

async function testConnection() {
  try {
    const data = await db.select().from(events);
    console.log("Connection successful:", data);
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
}

testConnection();
