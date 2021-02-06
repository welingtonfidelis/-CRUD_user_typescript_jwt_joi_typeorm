import { Response } from 'express';
import { string } from 'joi';

interface ErrorItem {
  code: number;
  message: string[];
}

const utils = {
  successResponse(res: Response, data: any, code: number = 200) {
    return res.status(code).json({ ok: true, response: data });
  },

  errorResponse(res: Response, error: ErrorItem) {
    console.log('ERROR ===> \n', error, '\n <=== ERROR');

    const code = error.code || 500;
    const message = error.message || 'Internal server error';

    return res.status(code).json({ ok: false, message });
  }
} 

export default utils;