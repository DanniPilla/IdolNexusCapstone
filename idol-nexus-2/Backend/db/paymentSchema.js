import {
  pgTable,
  serial,
  integer,
  varchar,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

import { orders } from "./orderSchema.js";
import { users } from "./userSchema.js";

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  // Payment Details
  stripePaymentId: varchar("stripe_payment_id", { length: 255 })
    .unique()
    .notNull(), // Stripe charge/payment ID
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD").notNull(),
  paymentStatus: varchar("payment_status", { length: 20 }).default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
