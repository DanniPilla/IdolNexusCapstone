import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import { events } from "./eventSchema.js";
import { users } from "./userSchema.js";

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),

  // Foreign keys
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),

  // Ticket attributes
  purchaseDate: timestamp("purchase_date").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),

  ticketType: varchar("ticket_type", { length: 30 }).default("general"),
  seatNumber: varchar("seat_number", { length: 10 }),

  // Pricing and capacity
  price: numeric("price", { precision: 10, scale: 2 }).notNull(), // Handles decimals
  currency: varchar("currency", { length: 10 }).default("AUD"),
  quantity: integer("quantity").notNull().default(1),
  maxPerUser: integer("max_per_user").default(10),
  availabilityCount: integer("availability_count").notNull().default(0),

  status: varchar("status", { length: 20 }).notNull().default("active"),
});
