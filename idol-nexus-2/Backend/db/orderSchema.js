import {
  pgTable,
  serial,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { tickets } from "./ticketSchema.js";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  // Foreign keys
  ticketId: integer("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),

  // Order attributes
  quantity: integer("quantity").default(1).notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),

  // Timestamps
  orderedAt: timestamp("ordered_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
