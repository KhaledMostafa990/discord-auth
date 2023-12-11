
# Discord Auth API

## Demo 
    

## Table of contents

- [About](#about)
- [Getting started](#getting-started)
- [Technologies](#technologies)

## About

This is a simple API that allows you to authenticate users with Discord. It uses the OAuth2 protocol to authenticate users with Discord and then returns a JWT token that can be used to authenticate the user in your application.

## Getting started

### Environment variables

```bash
# Create a .env file in the root directory of the project

$ touch config.env


# Add the following environment variables to the config.env file

NODE_ENV=<your_node_env> # e.g. development
PORT=<your_port> # e.g. 3000
HOST=<your_server_url> # e.g. http://localhost


# See the discord docs: https://discord.com/developers/docs/getting-started

DISCORD_REDIRECT_URL=<your_discord_redirect_url> 
# e.g. http://localhost:3000/api/auth/discord/redirect 
# It must start with <your_host>:<your_port>/auth/ then <your-redirect-env-variable>

DISCORD_AUTH_URL=<your_discord_auth_url> # e.g. https://discord.com/api/oauth2/authorize?<your_query_params>
DISCORD_CLIENT_ID=<your_discord_client_id> # e.g. 1234567890
DISCORD_CLIENT_SECRET=<your_discord_client_secret> # e.g. qwertyuiopasdfghjklzxcvbnm

# Postgres database credentials
POSTGRES_HOST=<your_postgres_host>
POSTGRES_USER=<your_postgres_user>
POSTGRES_PASSWORD=<your_postgres_password>
POSTGRES_DB=<your_postgres_db>
POSTGRES_PORT=<your_postgres_port>

# JWT secrets tokens
ACCESS_TOKEN_SECRET=<your_access_token_secret>
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
```

### Running the application

```bash
# Clone this repository
$ git clone

# Install dependencies
$ npm install

# Run the application
$ npm run dev

# Run the application in production mode
$ npm run serve
```

## Technologies

- [x] Typescript
- [x] Node.js
- [x] Express
- [x] PostgreSQL
- [x] JWT
- [x] Axios
- [x] Cors
- [x] Dotenv
- [x] Nodemon
- [x] Morgan
- [x] Webpack

## Author

- [**@khaledmostafa990**](https://github.com/KhaledMostafa990)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details