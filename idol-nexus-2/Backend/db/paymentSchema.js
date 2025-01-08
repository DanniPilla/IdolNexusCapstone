import {
  pgTable,
  serial,
  integer,
  varchar,
  numeric,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { orders } from "./orderSchema.js";

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),

  // Foreign keys
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),

  // Payment details
  stripePaymentId: varchar("stripe_payment_id", { length: 255 })
    .unique()
    .notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
