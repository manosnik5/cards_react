import dotenv from 'dotenv';

dotenv.config();

const getEnv = (name, fallback) => process.env[name] ?? fallback;

export const NODE_ENV = getEnv('NODE_ENV', 'development');

export const SERVER_PORT = Number(getEnv('PORT', getEnv('SERVER_PORT', 5000)));

export const DATABASE_URL = getEnv('DATABASE_URL', '');
export const JWT_SECRET = getEnv('JWT_SECRET', 'change-this-in-production');
export const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN', '1d');


export const DATABASE_SSL = getEnv('DATABASE_SSL', NODE_ENV === 'production' ? 'true' : 'false') === 'true';