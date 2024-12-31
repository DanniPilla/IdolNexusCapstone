import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE venues (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100),
      country VARCHAR(100) NOT NULL CHECK (length(country) = 2), -- ISO country code validation
      postal_code VARCHAR(20) CHECK (postal_code ~ '^[A-Za-z0-9 -]{3,10}$'), -- Validate postal code format
      capacity INTEGER DEFAULT 0 CHECK (capacity >= 0), -- Ensure non-negative capacity
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Indexes for better performance
  CREATE INDEX idx_venues_city ON venues (city);
  CREATE INDEX idx_venues_state ON venues (state);
  CREATE INDEX idx_venues_country ON venues (country);
`;

export const down = sql`
  -- Drop indexes first
  DROP INDEX IF EXISTS idx_venues_city;
  DROP INDEX IF EXISTS idx_venues_state;
  DROP INDEX IF EXISTS idx_venues_country;

  -- Drop table
  DROP TABLE venues;
`;