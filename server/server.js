import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './connection.js';
import { SERVER_PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import cardRouter from './routes/card.routes.js';
import packRouter from './routes/pack.routes.js';
import userRouter from './routes/user.routes.js';
import collectionRouter from './routes/collection.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

client.connect();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/v1/cards', cardRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/packs', packRouter)
app.use('/api/v1/collections', collectionRouter)


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
