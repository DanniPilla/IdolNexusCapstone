import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  numeric,
  integer,
  json,
} from "drizzle-orm/pg-core";

import { users } from "./userSchema.js";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),

  // Event Details
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(),
  tags: json("tags").default([]),

  organizerId: integer("organizer_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("upcoming"),

  location: varchar("location", { length: 255 }),
  virtualLink: text("virtual_link"), // For online events

  capacity: integer("capacity").default(0), // Max attendees

  thumbnailImage: text("thumbnail_image"), // URL to event thumbnail

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
