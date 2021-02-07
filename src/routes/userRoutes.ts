import { Router } from 'express';

import authMiddleware from '../middlewares/AuthMiddleware';
import inputValidate from '../middlewares/InputValidateMiddleware/user';

import UserController from '../controllers/UserController';

const userController = new UserController();
const router = Router();

router.post('/users', inputValidate, userController.store);

router.get('/users', [authMiddleware, inputValidate], userController.index);
router.get('/users/:id', [authMiddleware, inputValidate], userController.show);
router.put('/users/:id', [authMiddleware, inputValidate], userController.update);
router.delete('/users/:id', [authMiddleware, inputValidate], userController.delete);

export default router;