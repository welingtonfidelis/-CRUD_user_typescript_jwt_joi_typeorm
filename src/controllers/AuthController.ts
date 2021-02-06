import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../app/models/User';
import UserView from '../app/models/UserView';

class AuthController {
  async authenticate(req: Request, res: Response) {
    try {
      const jwtSecret: string = process.env.JWT_SECRET!; 
      const repository = getRepository(User);
      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email } });

      if (!user) return res.sendStatus(401);

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) return res.sendStatus(401);

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '8h' });

      const userView = new UserView(user.id, user.email, token);

      return res.json(userView);

    } catch (error) {
      console.log(error);
      return res.status(error.code || 500).send(error)
    }
  }
}

export default AuthController;