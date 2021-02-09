import UserView from '../models/UserView';
import userRepository from '../repositories/user';

const methods = {
  async index(page: number, limit: number) {
    const skip = limit * (page - 1);
    const users = await userRepository.index(skip, limit);

    return users;
  },

  async show(id: string) {
    const user = await userRepository.showById(id);

    if (!user) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }

    return user;
  },

  async store(email: string, password: string) {
    const userExists = await userRepository.showByEmail(email);

    if (userExists) {
      throw {
        message: ['Email already in use'],
        code: 409
      }
    }

    const user = await userRepository.store(email, password);

    return user;
  },

  async update(id: string, email: string, password: string) {
    const userSelected = await userRepository.showById(id);

    if (!userSelected) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }

    const emailInUse = await userRepository.showByEmailWithDifferentId(id, email);

    if (emailInUse) {
      throw {
        message: ['Email already in use'],
        code: 400
      }
    }

    const user = await userRepository.update(id, email, password);

    return user;
  },

  async delete(id: string) {
    const userSelected = await userRepository.showById(id);

    if (!userSelected) {
      throw {
        message: ['User not found'],
        code: 400
      }
    }

    await userRepository.delete(id);

    return {};
  }
}

export default methods;