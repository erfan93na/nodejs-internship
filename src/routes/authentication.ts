import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

export { router };
