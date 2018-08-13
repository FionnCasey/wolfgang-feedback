import { Router } from 'express';

import userController from './userController';
import postController from './postController';
import commentController from './commentController';
import voteController from './voteController';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Wolfgang Feedback App Beta');
});

// User routes.
router.post('/register', userController.create);

// Post routes.
router.get('/posts', postController.getAll);
router.get('/posts/:postId', postController.getById);
router.post('/createPost', postController.create);
router.put('/updatePost', postController.update);
router.put('/deletePost', postController.delete); // We use PUT as the post is not actually deleted.

// Comment routes.
router.get('/comments', commentController.getAll);
router.post('/createComment', commentController.create);

// Vote routes.
router.post('/submitVote', voteController.create);

export default router;
