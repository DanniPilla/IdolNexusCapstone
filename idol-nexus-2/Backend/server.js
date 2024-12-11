import express from "express";
import cors from "cors";
import { db } from "./db/index.js";
import { events } from "./db/eventSchema.js";
import "dotenv/config";

//events
const app1 = express();
const PORT = 5000;

app1.use(cors()); // Allow requests from the frontend

// Endpoint to get all events
app1.get("/events", async (req, res) => {
  try {
    const eventList = await db.select().from(events);
    res.json(eventList);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});

app1.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
