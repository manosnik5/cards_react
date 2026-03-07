import pg from "pg";
import { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } from './config/env.js';

const { Pool } = pg;

const client = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  ssl: { rejectUnauthorized: false } // required for Neon
});

client.connect()
  .then(() => console.log('✅ Connected to Neon PostgreSQL'))
  .catch(err => console.error('❌ DB connection error:', err.message));

export { client };