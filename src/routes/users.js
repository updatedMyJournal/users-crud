import { Router } from 'express';
import { usersController } from '../controllers/index.js';

const router = Router();

router.get('/', usersController.findAll);

router.get('/:id', usersController.findOne);

router.post('/', usersController.create);

export default router;
