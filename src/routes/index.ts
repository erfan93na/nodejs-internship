import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import path from 'path';
import { router as authRouter } from './authentication';
const router = express.Router();

router.use('/auth', authRouter);

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/auth/signin',
  }),
  (req, res) => {
    res.render('welcome', { username: 'erfan' });
  }
);

export { router };
