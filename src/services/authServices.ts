import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserView from '../models/UserView';
import userRepository from '../repositories/user';

const methods = {
  async authenticate(email: string, password: string) {
    const jwtSecret: string = process.env.JWT_SECRET!;
    const user = await userRepository.showByEmail(email);

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