import { Request, Response} from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { DISCORD_AUTH_URL, SERVER_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, pgClient, USER_INFO_URL, DISCORD_ACCESS_TOKEN_URL, DISCORD_REDIRECT_URL, ENVIRONMENT  } from '../config';
  
export async function getDiscordAuthUrl(req: Request, res: Response) {
return res.json({ url: DISCORD_AUTH_URL});
}

export async function loginByDiscord (req: Request, res: Response) {
const { code } = req.query;

const authorizationInput = new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: `${SERVER_URL}/auth${DISCORD_REDIRECT_URL}`,
    code: String(code),
    client_id: String(process.env.DISCORD_CLIENT_ID),
    client_secret: String(process.env.DISCORD_CLIENT_SECRET),   
});


/**
 * 1. Get access token from discord for user
 */
const userAccessData = await axios.post(
    DISCORD_ACCESS_TOKEN_URL,
    authorizationInput,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }    
)

if(!userAccessData) {
    return res.status(401).json({ message: 'Unauthorized' });
}
// console.log(userAccessData.data);


/**
 * 2. Get user info from discord
 */
const { access_token, refresh_token } = userAccessData.data;
const discordUserInfo = await axios.get(USER_INFO_URL, {
    headers: {
        authorization: `Bearer ${access_token}`,
    },
})

if (!discordUserInfo) {
    return res.status(401).send({ message: 'Unauthorized' });
}
console.log(discordUserInfo.data);

const userData = {
    name: discordUserInfo.data.username,
    email: discordUserInfo.data.email,
    avatar: discordUserInfo.data.avatar,    
}

/**
 * 3. Create a session for user using JWT
 */

const refreshToken = jwt.sign({
    name: userData.name,
    email: userData.email,
}, REFRESH_TOKEN_SECRET, { expiresIn: '1h' });

res.cookie('jwt', refreshToken, { 
    httpOnly: true,
    sameSite: true,
    secure: ENVIRONMENT === 'production' ? true : false,
    // expires: new Date(Date.now() + 3600000), // 1 hour
    // domain: 'localhost',
});


// create table in postgresql if does not exist and a good  type for refreshToken in postgresql



/**
 * 4. Save user info in database
*/      

try {
    await pgClient.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            avatar VARCHAR(255) NOT NULL,
            refreshToken TEXT NOT NULL
        );
    `);

    let currentUser: any = {};
    const existingUser = await pgClient.query('SELECT * FROM users WHERE email = $1', [userData.email]);

    if (existingUser.rowCount === 0) {
        currentUser = await pgClient.query('INSERT INTO users (name, email, avatar, refreshToken) VALUES ($1, $2, $3, $4) RETURNING *', [userData.name, userData.email, userData.avatar, refreshToken]);
    } 
    else {
        currentUser = await pgClient.query('UPDATE users SET name = $1, avatar = $2, refreshToken = $3 WHERE email = $4 RETURNING *', [userData.name, userData.avatar, refreshToken, userData.email]);
    }
    console.log(currentUser.rows[0]);  
} catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
}

// const accessToken = jwt.sign(userData, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
/**
 * This should redirect to the frontend base domain name
 * Then frontend should check for jwt refresh token cookie and get his access token
 **/
return res.redirect('/');
}
  
export async function refreshAccessToken (req: Request, res: Response) {
    const { jwt: refreshToken } = req.cookies;
  
    if (!refreshToken) {
        res.status(401);
        return res.json({ message: 'Unauthorized' });
    }
  
    try {
        const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const decoded = payload as any;          
        const userPayload = {
            name:  decoded.name,
            email: decoded.email,
        };

        const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        console.log(accessToken);
        return res.json({accessToken});
    } catch (error: any) {
        // console.log(error.message);
        return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
}


export async function logout (req: Request, res: Response) {
    const refreshToken = req.cookies?.jwt;
    
    if (!refreshToken) return res.sendStatus(204);
    res.clearCookie('jwt');
    
    return res.json({ message: 'Logged out' });
}