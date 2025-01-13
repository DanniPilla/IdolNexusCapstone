import {
  pgTable,
  serial,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./userSchema.js";
import { events } from "./eventSchema.js";

export const calendar = pgTable("calendar", {
  id: serial("id").primaryKey(),

  // Foreign keys
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
