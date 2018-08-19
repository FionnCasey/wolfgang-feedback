import { Router } from 'express';

import { userController } from '../controllers';

const router = Router();

router.post('/signup', userController.create);
router.post('/login', userController.login);

export default router;
