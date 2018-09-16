import { Router } from 'express';

import { postController, commentController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
    res.status(200).send('Wolfgang Feedback App Beta');
});

// Post routes.
router.get('/posts', postController.fetch);
router.get('/posts/:id', postController.findById);
router.post('/posts', postController.create);
//router.put('/posts/:id', postController.update);
//router.delete('/posts/:id', postController.delete);
router.post('/posts/:id/vote', postController.vote);

// Comment routes.
//router.get('/comments', commentController.fetch);
//router.get('/comments/:id', commentController.findById);
//router.post('/comments', commentController.create);
//router.post('/comments/:id/vote', postController.vote);

export default router;
