import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  return app;
}