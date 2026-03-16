import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    rejectUnauthorized: false 
  }
});

client.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

client.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export { client };