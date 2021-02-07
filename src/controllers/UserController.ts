import { Request, Response } from 'express';

import userServices from '../services/userServices';
import utils from '../utils';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 2;

      const data = await userServices.index(page, limit);

      return res.send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      const data = await userServices.show(id);

      return res.send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const data = await userServices.store(email, password);

      return res.status(201).send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;

      const data = await userServices.update(id, email, password);

      return res.send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await userServices.delete(id);

      return res.send(utils.successResponse(data));

    } catch (error) {
      const { code, data } = utils.errorResponse(error);
      return res.status(code).send(data);
    }
  }
}

export default UserController;