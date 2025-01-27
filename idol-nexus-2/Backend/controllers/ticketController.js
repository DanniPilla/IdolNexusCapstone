import { db } from "../lib/index.js";
import { tickets } from "../db/ticketSchema.js";
import { eq } from "drizzle-orm";

export const getAllTickets = async (req, res) => {
  try {
    const allTickets = await db.select().from(tickets);
    res.json(allTickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets", error });
  }
};

export const createTicket = async (req, res) => {
  const { eventId, userId, ticketType, price, quantity, maxPerUser } = req.body;
  try {
    if (quantity > maxPerUser) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds maximum per user limit." });
    }

    await db.insert(tickets).values({
      eventId,
      userId,
      ticketType: ticketType || "general",
      price,
      quantity,
      maxPerUser: maxPerUser || 10,
    });

    res.status(201).json({ message: "Ticket created successfully." });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getTicketsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from decoded token
    const userTickets = await db
      .select()
      .from(tickets)
      .where(eq(tickets.userId, userId));
    res.json(userTickets);
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id))
      .limit(1);
    if (ticket.length === 0) {
      return res.status(404).json({ message: "Ticket not found." });
    }
    res.json(ticket[0]);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { price, quantity, status } = req.body;

  try {
    const updatedTicket = await db
      .update(tickets)
      .set({
        price,
        quantity,
        status,
      })
      .where(tickets.id === Number(id));

    if (updatedTicket.rowCount === 0) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    res.json({ message: "Ticket updated successfully." });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTicket = await db
      .delete()
      .from(tickets)
      .where(tickets.id === Number(id));

    if (deletedTicket.rowCount === 0) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    res.json({ message: "Ticket deleted successfully." });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const getTicketRevenue = async (req, res) => {
  const { eventId } = req.params;
  try {
    const revenue = await db
      .select({
        totalRevenue: db.fn.sum(tickets.price.multiply(tickets.quantity)),
      })
      .from(tickets)
      .where(tickets.eventId === Number(eventId))
      .and(tickets.status === "active");

    res.json({ revenue: revenue[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error("Error calculating ticket revenue:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
