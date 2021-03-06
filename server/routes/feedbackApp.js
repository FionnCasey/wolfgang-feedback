import { Router } from 'express';

import { postController, commentController, voteController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Wolfgang Feedback App Beta');
});

// Post routes.
router.get('/posts', postController.getAll);
router.get('/posts/:id', postController.getById);
router.post('/posts', postController.create);
router.put('/posts/:id', postController.update);
router.delete('/posts/:id', postController.delete);

// Comment routes.
router.get('/comments', commentController.getAll);
router.get('/comments/:id', commentController.getAll);
router.post('/comments', commentController.create);
router.post('/comments/:id/vote', commentController.submitVote);

// Vote routes.
router.post('/votes', voteController.create);

export default router;
