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
      price NUMERIC(10, 2) NOT NULL,
      currency VARCHAR(10) DEFAULT 'AUD' CHECK (currency ~ '^[A-Z]{3}$'), -- Ensure valid ISO currency codes
      quantity INTEGER DEFAULT 1 NOT NULL CHECK (quantity > 0), -- Ensure positive quantity
      max_per_user INTEGER DEFAULT 10,
      status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'cancelled')) -- Restrict valid statuses
    );

    -- Indexes for better performance
    CREATE INDEX idx_tickets_event_id ON tickets (event_id);
    CREATE INDEX idx_tickets_user_id ON tickets (user_id);
    CREATE INDEX idx_tickets_event_type ON tickets (event_id, ticket_type);
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    -- Drop indexes first
    DROP INDEX IF EXISTS idx_tickets_event_id;
    DROP INDEX IF EXISTS idx_tickets_user_id;
    DROP INDEX IF EXISTS idx_tickets_event_type;

    -- Drop table
    DROP TABLE tickets;
  `);
};