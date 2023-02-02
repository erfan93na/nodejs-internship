import express from 'express';
import path from 'path';
import { router as authRouter } from './authentication';

const router = express.Router();

router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.render('welcome', { username: 'erfan' });
});

export { router };
