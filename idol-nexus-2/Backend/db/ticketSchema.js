import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  numeric,
  check,
} from "drizzle-orm/pg-core";

import { events } from "./eventSchema.js";
import { users } from "./userSchema.js";

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),

  // Foreign keys
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Ticket attributes
  purchaseDate: timestamp("purchase_date").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  ticketType: varchar("ticket_type", { length: 30 }).default("general"),

  // Pricing and capacity
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),

  quantity: integer("quantity").notNull().default(1),
  maxPerUser: integer("max_per_user").default(10),

  // Status
  status: varchar("status", { length: 20 }).default("active"),
});
