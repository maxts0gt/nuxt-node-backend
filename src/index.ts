import express, { Request, Response } from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { routes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

createConnection().then(() => {
  app.use(express.json());
  app.use(
    cors({
      origin: ['http://localhost:3000'],
    })
  );

  routes(app);

  app.listen(8000, () => {
    console.log('Listening on port: 8000');
  });
});
