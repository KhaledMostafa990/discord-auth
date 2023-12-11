import { NextFunction, Request, Response } from 'express';

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err.stack);
  return res.status(500).send(err.message);
}
