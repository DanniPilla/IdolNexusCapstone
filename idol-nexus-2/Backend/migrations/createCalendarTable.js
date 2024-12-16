import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    CREATE TABLE calendar (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      added_at TIMESTAMP DEFAULT NOW() NOT NULL,
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
    );
  `);
};

export const down = async (db) => {
  await db.execute(sql`
    DROP TABLE calendar;
  `);
};
