import express from 'express';
import path from 'path';
import { User } from '../models/User';

const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) res.render('signup', { userExists: true });
      else return User.create({ username, password });
    })
    .then(() => {
      res.redirect('signin');
    });
});
export { router };
