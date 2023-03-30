import express from 'express';
import path from 'path';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin', { wrongCredentionals: false });
});
router.post('/signin', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (!user) return res.render('signin', { wrongCredentionals: true });
      const payload = { sub: username };
      if (process.env.JWT_KEY) {
        const token = jwt.sign(payload, process.env.JWT_KEY);
        res.cookie('jwt', token);
        res.redirect('/');
      }
    })
    .catch(console.log);
});
router.get('/signup', (req, res) => {
  res.render('signup', { userExists: false });
});
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((user) => {
    if (user) res.render('signup', { userExists: true });
    else
      User.create({ username, password })
        .then(() => {
          res.redirect('/auth/signin');
        })
        .catch(console.log);
  });
});
export { router };
