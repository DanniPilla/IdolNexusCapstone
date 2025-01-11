import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const events = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 50 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    virtualLink: text("virtual_link"),
    capacity: integer("capacity").default(0),
    thumbnailImage: text("thumbnail_image"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    venueId: integer("venue_id"),
  },
  (events) => ({
    startDateIndex: index("idx_events_start_date").on(events.startDate),
    categoryIndex: index("idx_events_category").on(events.category),
    venueIdIndex: index("idx_events_venue_id").on(events.venueId),
  })
);
