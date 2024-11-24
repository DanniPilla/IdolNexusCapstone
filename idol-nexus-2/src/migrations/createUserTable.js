import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    firebaseUid VARCHAR(255) NOT NULL,
    displayName VARCHAR(255),
    email VARCHAR(255),
    location VARCHAR(255),
    createdAt TIMESTAMP
  );
`;

export const down = sql`
  DROP TABLE user;
`;
