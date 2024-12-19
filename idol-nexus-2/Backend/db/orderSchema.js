import {
  pgTable,
  serial,
  integer,
  numeric,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { tickets } from "./ticketSchema.js";
import { users } from "./userSchema.js";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ticketId: integer("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  orderStatus: varchar("order_status", { length: 20 }).default("pending"),
  orderedAt: timestamp("ordered_at").defaultNow(),
});
