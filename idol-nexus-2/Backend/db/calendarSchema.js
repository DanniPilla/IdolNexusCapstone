import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { events } from "./eventSchema.js"; // Import the events table
import { users } from "./userSchema.js"; // Import the users table

export const calendar = pgTable("calendar", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  added_at: timestamp("added_at").defaultNow().notNull(),
});
