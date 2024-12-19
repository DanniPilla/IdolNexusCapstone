import { db } from "../lib/index.js";
import { venues } from "../db/venueSchema.js";

export const getAllVenues = async (req, res) => {
  try {
    const allVenues = await db.select().from(venues);
    res.json(allVenues);
  } catch (error) {
    res.status(500).json({ message: "Error fetching venues", error });
  }
};
