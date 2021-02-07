import { Request } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserView from '../models/UserView';

const methods = {
  async authenticate(req: Request) {
    const jwtSecret: string = process.env.JWT_SECRET!; 
      const repository = getRepository(User);
      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email } });

      if (!user) {
        throw {
          message: ['Invalid email or password'],
          code: 401
        }
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        throw {
          message: ['Invalid email or password'],
          code: 401
        }
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '8h' });

      const userView = new UserView(user.id, user.email, token);

      return userView;
  }
}

export default methods;