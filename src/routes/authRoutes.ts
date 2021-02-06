import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const authController = new AuthController();
const router = Router();

router.post('/auth', authController.authenticate);

export default router;