import { db } from "./lib/index.js";
import { venues } from "./db/venueSchema.js"; // Adjust path

(async () => {
  try {
    const results = await db.select().from(venues);
    console.log("Venues fetched successfully:", results);
  } catch (error) {
    console.error("Error fetching venues with Drizzle ORM:", error.message);
  }
})();
