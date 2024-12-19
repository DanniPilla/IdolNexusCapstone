import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE venues (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100),
      country VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20),
      capacity INTEGER DEFAULT 0
    );
`;

export const down = sql`
  DROP TABLE venues
`;
