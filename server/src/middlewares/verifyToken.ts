import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'Not authenticated!' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(400).json({ message: 'Token missing!' });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as Secret
    ) as any;
    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
