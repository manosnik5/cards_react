import pg from "pg";
import { DATABASE_URL, DATABASE_SSL } from "./config/env.js";

const { Client } = pg;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Set it in your environment or .env file.');
}

const client = new Client({
  connectionString: DATABASE_URL,
  ssl: DATABASE_SSL ? { rejectUnauthorized: false } : false,
});

export { client };