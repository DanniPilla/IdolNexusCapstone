import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  decimal,
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
    ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }).default(
      0.0
    ), // Ticket price field
    venueName: varchar("venue_name", { length: 255 }), // Venue name
    venueAddress: text("venue_address"), // Venue address
    venueCity: varchar("venue_city", { length: 100 }), // Venue city
    venueCountry: varchar("venue_country", { length: 100 }), // Venue country
    userId: integer("user_id").notNull(), // Foreign key for user
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (events) => ({
    startDateIndex: index("idx_events_start_date").on(events.startDate),
    categoryIndex: index("idx_events_category").on(events.category),
    userIdIndex: index("idx_events_user_id").on(events.userId), // Index for userId
  })
);
