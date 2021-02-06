import { Router } from 'express';

import authMiddleware from '../middlewares/AuthMiddleware';
import inputValidate from '../middlewares/InputValidateMiddleware/user';

import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.post('/users', userController.store);

router.get('/users', [authMiddleware, inputValidate], userController.index);

export default router;