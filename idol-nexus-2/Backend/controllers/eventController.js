import { db } from "../lib/index.js";
import { events } from "../db/eventSchema.js";

export const getAllEvents = async (req, res) => {
  try {
    const allEvents = await db.select().from(events);
    res.json(allEvents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await db
      .select()
      .from(events)
      .where(events.id.equals(Number(id)));
    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

export const createEvent = async (req, res) => {
  const { name, description, category, startDate, endDate, organizerId } =
    req.body;
  try {
    const newEvent = await db.insert(events).values({
      name,
      description,
      category,
      startDate,
      endDate,
      organizerId,
    });
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, startDate, endDate } = req.body;
  try {
    const updated = await db
      .update(events)
      .set({
        name,
        description,
        category,
        startDate,
        endDate,
      })
      .where(events.id.equals(Number(id)));
    res.json({ message: "Event updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(events).where(events.id.equals(Number(id)));
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
