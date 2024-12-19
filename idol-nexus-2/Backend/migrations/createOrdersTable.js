import { sql } from "drizzle-orm";

export const up = sql`
CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      ticket_id INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
      quantity INTEGER DEFAULT 1 NOT NULL,
      total_amount NUMERIC(10, 2) NOT NULL,
      order_status VARCHAR(20) DEFAULT 'pending',
      ordered_at TIMESTAMP DEFAULT NOW()
    );
`;

export const down = sql`
  DROP TABLE orders
`;
