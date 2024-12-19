import { db } from "../lib/index.js";
import { tickets } from "../db/ticketSchema.js";

export const getAllTickets = async (req, res) => {
  try {
    const allTickets = await db.select().from(tickets);
    res.json(allTickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error });
  }
};
