import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      ticket_id INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      quantity INTEGER DEFAULT 1 NOT NULL CHECK (quantity > 0), -- Ensure positive quantity
      total_amount NUMERIC(10, 2) NOT NULL,
      ordered_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Indexes for improved performance
  CREATE INDEX idx_orders_user_id ON orders (user_id);
  CREATE INDEX idx_orders_ticket_id ON orders (ticket_id);
`;

export const down = sql`
  -- Drop indexes first
  DROP INDEX IF EXISTS idx_orders_user_id;
  DROP INDEX IF EXISTS idx_orders_ticket_id;

  -- Drop table
  DROP TABLE orders;
`;