import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
   CREATE TABLE tickets (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      purchase_date TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      ticket_type VARCHAR(30) DEFAULT 'general',
      seat_number VARCHAR(10),
      price NUMERIC(10, 2) NOT NULL,
      currency VARCHAR(10) DEFAULT 'AUD',
      quantity INTEGER DEFAULT 1 NOT NULL,
      max_per_user INTEGER DEFAULT 10,
      availability_count INTEGER DEFAULT 0 NOT NULL,
      status VARCHAR(20) DEFAULT 'active'
    );
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    DROP TABLE tickets;
  `);
};
