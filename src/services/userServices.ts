import { Request } from 'express';
import { getRepository, Not } from 'typeorm';
import User from '../models/User';
import UserView from '../models/UserView';

const methods = {
  async index(req: Request) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 2;

    const repository = getRepository(User);
    const users = await repository.find({ skip: limit * (page - 1), take: limit });
    const usersView = users.map((item: User) => new UserView(item.id, item.email));

    return usersView;
  },

  async show(req: Request) {
    const repository = getRepository(User);
    const { id } = req.params;

    const userSelected = await repository.findOne({ where: { id } });

    if (!userSelected) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }
    
    const usersView = new UserView(userSelected.id, userSelected.email);

    return usersView;
  },

  async store(req: Request) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      throw {
        message: ['Email already in use'],
        code: 409
      }
    }

    const user = repository.create({ email, password });
    await repository.save(user);

    const userView = new UserView(user.id, user.email);

    return userView;
  },

  async update(req: Request) {
    const repository = getRepository(User);
    const { id } = req.params;
    const { email, password } = req.body;

    const userSelected = await repository.findOne({ where: { id } });

    if (!userSelected) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }

    const emailInUse = await repository.findOne({ where: { email, id: Not(id) } });

    if (emailInUse) {
      throw {
        message: ['Email already in use'],
        code: 400
      }
    }

    const user = new User(userSelected.id, email, password);
    await repository.save(user);

    const userView = new UserView(user.id, user.email);

    return userView
  },

  async delete(req: Request) {
    const repository = getRepository(User);
    const { id } = req.params;

    const userSelected = await repository.findOne({ where: { id } });

    if (!userSelected) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }
  
    await repository.delete({ id });

    return {};
  }
}

export default methods;