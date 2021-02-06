import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../app/models/User';
import UserView from '../app/models/UserView';

class UserController {
  async index(req: Request, res: Response) {
    try {
      const repository = getRepository(User);

      const users = await repository.find();
      const usersView = users.map((item: User) => new UserView(item.id, item.email));

      return res.json(usersView);
      
    } catch (error) {
      console.log(error);
      return res.status(error.code || 500).send(error);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { email, password } = req.body;

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) return res.sendStatus(409);

      const user = repository.create({ email, password });
      await repository.save(user);

      return res.json(user);

    } catch (error) {
      console.log(error);
      return res.status(error.code || 500).send(error)
    }
  }
}

export default UserController;