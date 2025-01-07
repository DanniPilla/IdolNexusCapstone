import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  // Authentication
  firebase_uid: varchar("firebase_uid", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }),

  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  displayName: varchar("display_name", { length: 255 }),
  profilePicture: varchar("profile_picture", { length: 255 }),
  role: varchar("role", { length: 20 }).default("attendee"),
  isActive: boolean("is_active").default(true), // Soft delete or deactivate accounts
  lastLogin: timestamp("last_login"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  socialLinks: json("social_links").default({}),

  // User Preferences
  preferences: json("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
