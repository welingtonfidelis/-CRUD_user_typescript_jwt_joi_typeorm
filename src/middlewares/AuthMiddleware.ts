import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtSecret: string = process.env.JWT_SECRET!;
    const { authorization } = req.headers;

    if (!authorization) return res.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();
    const data = jwt.verify(token, jwtSecret);
    const { id } = data as TokenPayload; 
    
    req.userId = id;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(error.code || 401).send(error);
  }
}

export default authMiddleware;