import { Router } from 'express';

import userController from './controllers/userController';
import postController from './controllers/postController';
import commentController from './controllers/commentController';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Wolfgang Feedback App Beta');
});

// User routes.
router.post('/register', userController.create);

// Post routes.
router.get('/posts', postController.get);
router.post('/createPost', postController.create);

// Comment routes.
router.get('/comments', commentController.get);
router.post('/createComment', commentController.create);

export default router;
