import { Request, Response } from 'express';
import { User } from '../models';

export const signin = (req: Request, res: Response) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (!user) {
        res.status(400).json('Invalid Username or Password');
      } else {
        const token = user.generateAuthToken();
        res.status(200).json({ token });
      }
    })
    .catch((e) => {
      res.status(500).send('server error');
    });
};

export const signup = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send('Username and Password should be filled');
  User.findOne({ username })
    .then((user) => {
      if (user) return res.status(400).json('Username already exists');
      else
        User.create({ username, password }).then(() => {
          return res.status(200).json('User Created');
        });
    })
    .catch(() => res.status(500).send('server error'));
};
