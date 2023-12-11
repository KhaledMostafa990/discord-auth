import express, { Express } from 'express';

import path from 'path';

import { ErrorHandler } from './middleware/errorHandler';

import authRoute from './routes/auth';
import frontendRoute from './routes/frontend';
import userRoute from './routes/user';

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
      };
    }
  }
}

export default async (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, '..', 'src','public')));
      
  app.use('/auth', authRoute)

  app.use('/user', userRoute);

  app.use('/', frontendRoute);

  app.use(ErrorHandler);
};

