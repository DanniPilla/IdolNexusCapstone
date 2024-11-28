import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(), // Foreign key to the events table
  userId: integer("user_id").notNull(), // Foreign key to the users table
  purchaseDate: timestamp("purchase_date").defaultNow(),
  seatNumber: varchar("seat_number", { length: 10 }),
  price: varchar("price", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("active"),
});

foreignKey(tickets.eventId, "events", "id"); // Links eventId to events.id
foreignKey(tickets.userId, "users", "id"); // Links userId to users.id
