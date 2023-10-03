import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
declare module 'express-serve-static-core' {
  export interface Request {
    user: any;
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  !authHeader && res.status(400).json({ message: 'Not authenticated!' });
  const token = authHeader?.split(' ')[1];

  let payload;
  try {
    payload = jwt.verify(token!, process.env.JWT_SECRET_KEY as Secret);
  } catch (error) {
    res.status(500).json(error);
  }
  req.user = payload;
  next();
};
