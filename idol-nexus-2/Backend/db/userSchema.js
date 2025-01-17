import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  json,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  // Authentication
  firebase_uid: varchar("firebase_uid", { length: 255 }).unique(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }),

  // Personal details
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  displayName: varchar("display_name", { length: 255 }),
  profilePicture: varchar("profile_picture", { length: 255 }),
  role: varchar("role", { length: 20 }).default("attendee"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  bio: text("bio"), // Organiser-specific
  organisationName: varchar("organisation_name", { length: 255 }),
  websiteUrl: varchar("website_url", { length: 255 }),
  socialLinks: json("social_links").default("{}"),
  preferences: json("preferences").default("{}"),

  callAndResponse: text("call_and_response"),
  hobby: text("hobby"),
  favoriteFood: varchar("favorite_food", { length: 255 }),
  favoriteColor: varchar("favorite_color", { length: 50 }),
  height: varchar("height", { length: 20 }),
  birthday: timestamp("birthday"),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
