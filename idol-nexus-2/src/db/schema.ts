import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  date: timestamp('date'),
  location: varchar('location', { length: 255 }),
  price: varchar('price', { length: 50 }),
});