import dotenv from 'dotenv';

// Always override existing env vars with .env values when present.
// This prevents system/environment vars from unintentionally breaking local dev.
dotenv.config({ override: true });

const getEnv = (name, fallback) => process.env[name] ?? fallback;

export const NODE_ENV = getEnv('NODE_ENV', 'development');

export const SERVER_PORT = Number(getEnv('PORT', getEnv('SERVER_PORT', 5000)));

export const DATABASE_URL = getEnv('DATABASE_URL', '');
export const JWT_SECRET = getEnv('JWT_SECRET', 'change-this-in-production');
export const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN', '1d');


// DATABASE_SSL should be explicitly set in production when SSL is required.
// Default to false to avoid accidental SSL mode when NODE_ENV is set to production by default.
export const DATABASE_SSL = getEnv('DATABASE_SSL', 'false') === 'true';