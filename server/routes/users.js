import { Router } from 'express';
import asyncMiddleware from '../utils/asyncMiddleware';

const router = Router();

router.get('/', asyncMiddleware(async (req, res, next) => {
  res.status(200).send('This is the users route.');
}));

export default router;
