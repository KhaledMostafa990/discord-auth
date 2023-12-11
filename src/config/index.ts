export const ENVIRONMENT = `${process.env.ENV}` || 'development';
export const PORT = process.env.PORT || 3000;
export const SERVER_URL = `${ENVIRONMENT === 'production' ? 'https' : 'http'}://${process.env.HOST}:${PORT}`;

// console.log('SERVER_URL', SERVER_URL, ENVIRONMENT);

export const POSTGRES_HOST = String(process.env.POSTGRES_HOST);
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_DB = String(process.env.POSTGRES_DB);
export const POSTGRES_USER = String(process.env.POSTGRES_USER);
export const POSTGRES_PASSWORD = String(process.env.POSTGRES_PASSWORD);

export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET);
export const REFRESH_TOKEN_SECRET = String(process.env.REFRESH_TOKEN_SECRET);

export const DISCORD_REDIRECT_URL = String(process.env.DISCORD_REDIRECT_URL);
export const DISCORD_CLIENT_ID = String(process.env.DISCORD_CLIENT_ID);
export const DISCORD_CLIENT_SECRET = String(process.env.DISCORD_CLIENT_SECRET);
export const DISCORD_AUTH_URL = String(process.env.DISCORD_AUTH_URL);

export const DISCORD_ACCESS_TOKEN_URL = 'https://discord.com/api/oauth2/token';
export const USER_INFO_URL = 'https://discord.com/api/users/@me';


export * from './connectdb';
export * from './corsOptions';