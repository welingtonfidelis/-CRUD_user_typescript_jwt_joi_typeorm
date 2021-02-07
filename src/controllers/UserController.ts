import { Request, Response } from 'express';

import userServices from '../services/userServices';
import utils from '../utils';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const data = await userServices.index(req);

      return utils.successResponse(res, data);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const data = await userServices.show(req);

      return utils.successResponse(res, data);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const data = await userServices.store(req);

      return utils.successResponse(res, data, 201);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = await userServices.update(req);

      return utils.successResponse(res, data);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const data = await userServices.delete(req);

      return utils.successResponse(res, data);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }
}

export default UserController;