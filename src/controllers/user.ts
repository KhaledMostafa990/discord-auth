import { Request, Response } from 'express';
import { pgClient } from '../config';

export async function getUserData (req: Request, res: Response) {
  
    const userAccess = req.user;
    // console.log(userAccess);

    if (userAccess == null) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // get user data from database by id and email
    const result = await pgClient.query('SELECT * FROM users WHERE email = $1', [userAccess.email]);
  
    // check if user exists in database
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'User not exist' });
    }
    console.log(result.rows[0]);
  
    try {
      const { user } = req;
      return res.json(user);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}