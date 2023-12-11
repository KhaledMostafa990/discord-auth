import express from 'express';

import { DISCORD_REDIRECT_URL } from '../config';
import { jwtVerify } from '../middleware/jwtVerify';
import { loginByDiscord, getDiscordAuthUrl, refreshAccessToken, logout } from '../controllers/auth';

const router = express.Router();

router.get(DISCORD_REDIRECT_URL, loginByDiscord);
  
router.get('/discord/url', getDiscordAuthUrl);
  
router.get('/refresh', refreshAccessToken);

router.get('/logout', jwtVerify, logout);

export default router;