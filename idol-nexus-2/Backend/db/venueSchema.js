import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  check,
  index,
} from "drizzle-orm/pg-core";

export const venues = pgTable(
  "venues",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }),
    capacity: integer("capacity").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (venues) => ({
    cityIndex: index("idx_venues_city").on(venues.city),
    stateIndex: index("idx_venues_state").on(venues.state),
    countryIndex: index("idx_venues_country").on(venues.country),
  })
);
