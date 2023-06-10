import { router as authRouter } from './auth';
import { router as usersRouter } from './users';
import express from 'express';

export const router = express.Router();
router.use('/auth', authRouter);
router.use('/users', usersRouter);
