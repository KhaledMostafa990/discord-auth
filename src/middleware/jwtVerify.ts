import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET } from '../config';

export async function jwtVerify(req: Request, res: Response, next: NextFunction) {    
    const bearer = req.get('authorization') || req.get('Authorization');
    const userToken = bearer?.split(' ')[1];


    // console.log(bearer, userToken);
    if (userToken == null) {        
        console.log(bearer);
        return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    try {
        const payload = jwt.verify(userToken, ACCESS_TOKEN_SECRET);
        req.user = payload as any;
        // console.log(req.user);
    } catch (error: any) {
        console.log(error.message);
        return res.status(401).json({ message: 'Unauthorized - Token invalid' });
    }

    next();        
}