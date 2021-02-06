import { Router } from 'express';

import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use(userRoutes);
router.use(authRoutes);

export default router;