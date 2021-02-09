import { getRepository, Not } from 'typeorm';
import User from '../models/User';
import UserView from '../models/UserView';

const methods = {
  async index(skip: number, take: number) {
    const repository = getRepository(User);

    const users = await repository.find({ skip, take });
    const usersView = users.map((item: User) => new UserView(item.id, item.email));

    return usersView;
  },

  async showById(id: string) {
    const repository = getRepository(User);

    return await repository.findOne({ where: { id } });
  },

  async showByEmail(email: string) {
    const repository = getRepository(User);

    return await repository.findOne({ where: { email } });
  },

  async showByEmailWithDifferentId(id: string, email: string) {
    const repository = getRepository(User);

    return await repository.findOne({ where: { email, id: Not(id) } });
  },

  async store(email: string, password: string) {
    const repository = getRepository(User);

    const user = repository.create({ email, password });
    await repository.save(user);

    const userView = new UserView(user.id, user.email);
    return userView;
  },

  async update(id: string, email: string, password: string) {
    const repository = getRepository(User);

    const user = new User(id, email, password);
    await repository.save(user);

    const userView = new UserView(user.id, user.email);
    return userView;
  },

  async delete(id: string) {
    const repository = getRepository(User);

    return await repository.delete({ id });
  }
}

export default methods;