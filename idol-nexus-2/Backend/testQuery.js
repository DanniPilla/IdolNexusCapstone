import { db } from "./lib/index.js";
import { config } from "dotenv";
(async () => {
  try {
    const result = await db.execute`SELECT 1 AS test_column`;
    console.log("Test query successful:", result);
  } catch (error) {
    console.error("Test query failed:", error.message);
  }
})();
