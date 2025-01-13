import { db } from "../lib/index.js";
import { events } from "../db/eventSchema.js";

export const getAllEvents = async (req, res) => {
  try {
    const query = db.select().from(events);
    console.log("Query:", query.toSQL()); // Log the SQL query for debugging

    // Execute the query
    const eventsList = await query;

    // Send the response
    res.json(eventsList);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      message: "Error fetching events",
      error: error.message || error,
    });
  }
};

export const getEventById = async (req, res) => {
  const id = req.params;
  try {
    const event = await db
      .select()
      .from(events)
      .where(events.id === Number(id));
    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

export const createEvent = async (req, res) => {
  const { name, description, category, startDate, endDate, userId } = req.body;
  try {
    const newEvent = await db.insert(events).values({
      name,
      description,
      category,
      startDate,
      endDate,
      userId,
    });
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, startDate, endDate, venueId } = req.body;
  try {
    const updated = await db
      .update(events)
      .set({
        name,
        description,
        category,
        startDate,
        endDate,
        venueId,
      })
      .where(events.id === Number(id));
    res.json({ message: "Event updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(events).where(events.id === Number(id));
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
