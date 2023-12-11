import { Client } from 'pg';
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from '../config';

export const pgClient = new Client({
  user:  POSTGRES_USER,
  host: POSTGRES_HOST,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  port: POSTGRES_PORT ,
});

export async function connectPostgresDB() {
  try {
    await pgClient.connect().catch((err) => console.log(err));
    console.log('PostgresDB Connected\n', pgClient.database);
  } catch (err) {
    console.log(err);
  }
};

export async function disconnectPostgresDB() {
  try {
    await pgClient.end();
    console.log('PostgresDB Disconnected\n');
  } catch (err) {
    console.log(err);
  }
};