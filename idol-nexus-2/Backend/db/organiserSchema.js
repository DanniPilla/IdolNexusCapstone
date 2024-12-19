import {
  pgTable,
  serial,
  varchar,
  text,
  json,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "./userSchema.js";

export const organiserProfiles = pgTable("organizer_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  organizationName: varchar("organization_name", { length: 255 }).notNull(),
  bio: text("bio"),
  websiteUrl: varchar("website_url", { length: 255 }),
  socialLinks: json("social_links").default({}),
});
