import { sql } from "drizzle-orm";

export const up = async (db) => {
  await db.execute(sql`
    CREATE TABLE calendar (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE ON UPDATE CASCADE
    );
  `);


  await db.execute(sql`CREATE INDEX idx_calendar_user_id ON calendar (user_id);`);
  await db.execute(sql`CREATE INDEX idx_calendar_event_id ON calendar (event_id);`);
};

export const down = async (db) => {
  // Drop indexes first
  await db.execute(sql`DROP INDEX IF EXISTS idx_calendar_user_id;`);
  await db.execute(sql`DROP INDEX IF EXISTS idx_calendar_event_id;`);
  
  // Drop table
  await db.execute(sql`DROP TABLE calendar;`);
};
