import { sql } from "drizzle-orm";

export const up = sql`
 CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firebase_uid VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      display_name VARCHAR(255),
      profile_picture VARCHAR(255),
      role VARCHAR(20) DEFAULT 'attendee',
      is_active BOOLEAN DEFAULT true,
      last_login TIMESTAMP,
      phone_number VARCHAR(20),
      social_links JSON DEFAULT '{}',
      preferences JSON DEFAULT '{}',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
`;

export const down = sql`
  DROP TABLE user;
`;
