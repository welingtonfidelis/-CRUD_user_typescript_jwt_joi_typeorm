import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import utils from '../utils';
interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtSecret: string = process.env.JWT_SECRET!;
    const { authorization } = req.headers;

    if (!authorization) {
      return utils.errorResponse(res, { message: ['jwt required'], code: 401 });
    }

    const token = authorization.replace('Bearer', '').trim();
    const data = jwt.verify(token, jwtSecret);
    const { id } = data as TokenPayload; 
    
    req.userId = id;

    return next();
  } catch (error) {
    return utils.errorResponse(res, { ...error, code: 401 });
  }
}

export default authMiddleware;