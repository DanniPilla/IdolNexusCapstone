import { sql } from "drizzle-orm";

export const up = sql`
   CREATE TABLE organizer_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      organization_name VARCHAR(255) NOT NULL,
      bio TEXT,
      website_url VARCHAR(255),
      social_links JSON DEFAULT '{}'
    );
`;

export const down = sql`
  DROP TABLE organizer_profiles
`;
