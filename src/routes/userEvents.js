import { Router } from 'express';
import { userEventsController } from '../controllers/index.js';

const router = Router();

router.get('/:id/events', userEventsController.findAllUserEvents);

router.post('/:id/events', userEventsController.create);

export default router;
