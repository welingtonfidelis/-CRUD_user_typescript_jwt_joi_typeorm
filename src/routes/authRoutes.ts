import { Router } from 'express';

import AuthController from '../controllers/AuthController';
import inputValidate from '../middlewares/InputValidateMiddleware/authenticate';

const authController = new AuthController();
const router = Router();

router.post('/auth', inputValidate ,authController.authenticate);

export default router;