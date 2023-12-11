import express from 'express';

import { frontendRender } from '../controllers/frontend';


const router = express.Router();

router.get('/', frontendRender);

export default router;