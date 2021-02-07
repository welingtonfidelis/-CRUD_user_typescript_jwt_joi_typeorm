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
      const { code, data } = utils.errorResponse({ message: ['jwt required'], code: 401 });
      return res.status(code).send(data);
    }

    const token = authorization.replace('Bearer', '').trim();
    const data = jwt.verify(token, jwtSecret);
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch (error) {
    const { code, data } = utils.errorResponse({ ...error, code: 401 })
    return res.status(code).send(data);
  }
}

export default authMiddleware;