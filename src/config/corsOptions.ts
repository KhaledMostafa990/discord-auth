import { CorsOptions } from 'cors';

type corsCallback = (err: Error | null, allowed: boolean) => {};
export const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:3000',
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(`${origin}`) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Sorry ${origin}not allowed by CORS`), false);
    }
  },
  // optionsSuccessStatus: 200,
  // credentials: true,
};
