import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    CREATE TABLE tickets (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      ticket_number VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(50) DEFAULT 'valid' NOT NULL,
      purchase_date TIMESTAMP DEFAULT NOW() NOT NULL,
      price VARCHAR(50) NOT NULL,
      qr_code TEXT DEFAULT NULL,
      CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    DROP TABLE tickets;
  `);
};
