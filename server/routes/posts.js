import { Router } from 'express';
import asyncMiddleware from '../utils/asyncMiddleware';
import Post from '../models/post';

const router = Router();

router.get('/', asyncMiddleware(async (req, res, next) => {
  res.status(200).send('This is the posts route.');
}));

router.post('/', (req, res, next) => {
  const { author, title, content } = req.body;

  // Validate required fields.
  if (!author || !title || !content) {
    return res.json({
      success: false,
      error: 'The following fields are required: [author, title, content]',
    });
  }
  const post = new Post({ author, title, content, tags });

  // Await something...?
  post.save(err => {
    if (err) return res.status(400).json({ succes: false, error: 'Error saving post' });
    return res.json({ success: true });
  });
});

export default router;
