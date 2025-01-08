import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  location: varchar("location", { length: 255 }),
  virtualLink: text("virtual_link"),
  capacity: integer("capacity").default(0),
  thumbnailImage: text("thumbnail_image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
