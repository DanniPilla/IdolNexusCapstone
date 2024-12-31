import { sql } from "drizzle-orm";

export const up = sql`
  CREATE TABLE payments (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
      amount NUMERIC(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  );

  -- Add indexes for performance
  CREATE INDEX idx_payments_order_id ON payments (order_id);

`;

export const down = sql`
  -- Drop indexes first
  DROP INDEX IF EXISTS idx_payments_order_id;

  -- Drop table
  DROP TABLE payments;
`;