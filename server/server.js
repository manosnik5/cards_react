import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './connection.js';
import { SERVER_PORT, NODE_ENV } from './config/env.js';

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

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));


app.use('/api/v1/cards', cardRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/packs', packRouter)
app.use('/api/v1/collections', collectionRouter)

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
  });
}


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
