import { db } from "../lib/index.js";
import { calendar } from "../db/calendarSchema.js";

export const getAllCalendars = async (req, res) => {
  try {
    const entries = await db.select().from(calendar);
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching calendar entries", error });
  }
};

export const getCalendarById = async (req, res) => {
  const { id } = req.params;
  try {
    const entry = await db
      .select()
      .from(calendar)
      .where(calendar.id === Number(id));
    if (!entry.length) {
      return res.status(404).json({ message: "Calendar entry not found" });
    }
    res.json(entry[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching calendar entry", error });
  }
};

export const createCalendar = async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const newEntry = await db.insert(calendar).values({ eventId, userId });
    res.status(201).json({ message: "Calendar entry created", newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating calendar entry", error });
  }
};

export const updateCalendar = async (req, res) => {
  const { id } = req.params;
  const { eventId, userId } = req.body;
  try {
    const updated = await db
      .update(calendar)
      .set({ eventId, userId })
      .where(calendar.id === Number(id));
    res.json({ message: "Calendar entry updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating calendar entry", error });
  }
};

export const deleteCalendar = async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(calendar).where(calendar.id === Number(id));
    res.json({ message: "Calendar entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting calendar entry", error });
  }
};
