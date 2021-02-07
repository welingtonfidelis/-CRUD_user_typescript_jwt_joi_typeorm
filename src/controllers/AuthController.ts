import { Request, Response } from 'express';

import authServices from '../services/authServices';
import utils from '../utils';
class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const data = await authServices.authenticate(req);

      return utils.successResponse(res, data);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }
}

export default AuthController;