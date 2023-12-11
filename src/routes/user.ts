import { Router } from 'express';

import { getUserData } from '../controllers/user';
import { jwtVerify } from '../middleware/jwtVerify';

const router = Router();

router.get('/', jwtVerify, getUserData);

export default router;
