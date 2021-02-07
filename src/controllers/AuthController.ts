import { Request, Response } from 'express';

import authServices from '../services/authServices';
import utils from '../utils';
class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await authServices.authenticate(email, password);

      return res.send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }
}

export default AuthController;