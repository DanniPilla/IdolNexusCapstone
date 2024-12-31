import { sql } from "drizzle-orm";

export const up = sql`
 CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      display_name VARCHAR(255),
      profile_picture VARCHAR(255),
      role VARCHAR(20) DEFAULT 'attendee' CHECK (role IN ('attendee', 'organiser', 'admin')), -- Roles
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP,
      phone_number VARCHAR(20),
      bio TEXT, -- Organiser-specific field
      organisation_name VARCHAR(255), -- Organiser-specific field
      website_url VARCHAR(255), -- Organiser-specific field
      social_links JSON DEFAULT '{}' CHECK (jsonb_typeof(social_links::jsonb) = 'object'), -- Organiser-specific field
      preferences JSON DEFAULT '{}' CHECK (jsonb_typeof(preferences::jsonb) = 'object'), -- Attendee-specific
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

    -- Indexes for performance
    CREATE UNIQUE INDEX idx_users_email ON users (email);
    CREATE INDEX idx_users_role ON users (role);
 `;

export const down = sql`
  -- Drop indexes first
  DROP INDEX IF EXISTS idx_users_email;
  DROP INDEX IF EXISTS idx_users_firebase_uid;
  DROP INDEX IF EXISTS idx_users_role;

  -- Drop table
  DROP TABLE users;
`;