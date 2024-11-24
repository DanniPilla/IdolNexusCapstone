import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'path'; // Ensure you import path

export default defineConfig({
  out: './src/migrations', // Folder for migrations and generated files
  schema: ['./src/db/userSchema.js', './src/db/eventSchema.js'],
  dialect: 'postgresql', 
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Database connection URL
  },
});