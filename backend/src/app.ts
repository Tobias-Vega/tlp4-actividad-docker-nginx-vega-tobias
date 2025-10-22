import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRouter from './modules/tasks/routes/task.router.js';

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use('/api/tasks', taskRouter);

  return app;
}