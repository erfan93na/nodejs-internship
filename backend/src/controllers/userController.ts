import { Request, Response } from 'express';
import { User } from '../models';

export const getUsers = (req: Request, res: Response) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send('Server error');
    });
};
