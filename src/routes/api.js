import { Router } from 'express';
import userRoutes from './users.js';
import userEventRoutes from './userEvents.js';

const router = Router();

router.use('/users', userRoutes, userEventRoutes);

export default router;
