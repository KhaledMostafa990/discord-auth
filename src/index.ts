import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { PORT, corsOptions, connectPostgresDB } from './config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import express from 'express';

import expressApp from './app';

const app = express();

start();

async function start() {
  try {
    app.use(morgan('common'));
        
    app.use(helmet());
        
    app.use(cors(corsOptions));
    
    app.use(cookieParser());
    
    await connectPostgresDB();

    await expressApp(app);

    app
      .listen(PORT, () => console.log(`Server running on port: ${PORT}`))
      .on('error', () => process.exit());
  } catch (error) {
    console.log(error);
  }
}
