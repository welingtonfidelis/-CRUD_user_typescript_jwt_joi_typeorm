import { Response } from 'express';
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

    const code = this.validateHttpStatusCode(error.code) ? error.code : 500;
    const message = error.message || 'Internal server error';

    return res.status(code).json({ ok: false, message });
  },

  validateHttpStatusCode(code: any) {
    const isValid = code
      && Number.isInteger(code)
      && code >= 100
      && code < 600;

    return isValid;
  }

  // createError(message = 'Internal server error', code = 500) {
  //   function GenericError() {
  //     this.message = message;
  //     this.code = code;
  //   }
  //   GenericError.prototype = Object.create(GenericError.prototype);
  //   GenericError.prototype.constructor = GenericError;

  //   throw new GenericError();
  // },
}

export default utils;