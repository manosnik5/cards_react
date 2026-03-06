import dotenv from 'dotenv';

dotenv.config()

export const {
    SERVER_PORT,
    DATABASE_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN
} = process.env