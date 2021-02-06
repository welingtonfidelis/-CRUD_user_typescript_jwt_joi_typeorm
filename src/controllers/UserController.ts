import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../app/models/User';
import UserView from '../app/models/UserView';
import utils from '../utils';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 2;
      
      const repository = getRepository(User);
      const users = await repository.find({ skip: limit * (page -1), take: limit });
      const usersView = users.map((item: User) => new UserView(item.id, item.email));

      return utils.successResponse(res, usersView);
      
    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { email, password } = req.body;

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) {
        return utils.errorResponse(res, { message: ['email already in use'], code: 409});
      }

      const user = repository.create({ email, password });
      await repository.save(user);

      const userView = new UserView(user.id, user.email);

      return utils.successResponse(res, userView, 201);

    } catch (error) {
      return utils.errorResponse(res, error);
    }
  }

  async update(req: Request, res: Response) {

  }
}

export default UserController;