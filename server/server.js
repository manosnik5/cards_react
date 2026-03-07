import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

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

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/packs', packRouter);
app.use('/api/v1/collections', collectionRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/dist/index.html"));
  });
}

app.listen(process.env.PORT || process.env.SERVER_PORT || 5000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 5000}`);
});