import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date TIMESTAMP,
    location VARCHAR(255),
    price VARCHAR(50),
    category TEXT
  );
`;

export const down = sql`
  DROP TABLE events;
`;
