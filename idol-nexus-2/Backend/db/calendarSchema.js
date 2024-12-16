import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const calendar = pgTable("calendar", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull(),
  event_id: integer("event_id").notNull(),
  added_at: timestamp("added_at").defaultNow().notNull(),
});
