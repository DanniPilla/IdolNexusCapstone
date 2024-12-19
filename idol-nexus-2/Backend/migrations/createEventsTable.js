import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(50) NOT NULL,
      tags JSON DEFAULT '[]',
      organizer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      status VARCHAR(20) DEFAULT 'upcoming',
      location VARCHAR(255),
      virtual_link TEXT,
      capacity INTEGER DEFAULT 0,
      thumbnail_image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
`;

export const down = sql`
  DROP TABLE events;
`;
