import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(50) NOT NULL,
      start_date TIMESTAMP NOT NULL,
      end_date TIMESTAMP NOT NULL,
      location VARCHAR(255),
      virtual_link TEXT,
      capacity INTEGER DEFAULT 0,
      thumbnail_image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );

  -- Indexes for improved query performance
  CREATE INDEX idx_events_start_date ON events (start_date);
  CREATE INDEX idx_events_category ON events (category);
`;

export const down = sql`
  -- Drop indexes first
  DROP INDEX IF EXISTS idx_events_start_date;
  DROP INDEX IF EXISTS idx_events_category;
  DROP INDEX IF EXISTS idx_events_status;

  -- Drop table
  DROP TABLE events;
`;