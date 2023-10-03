import { Request, Response } from "express";
import { generateJwtToken } from "../configs/jwt";
import { User } from "../models";

export const signIn = (req: Request, res: Response) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        const token = generateJwtToken({ sub: user.username });
        res.status(200).send({ token });
      } else res.status(400).send("user not found");
    })
    .catch(console.log);
};

export const signUp = (req: Request, res: Response) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.status(400).send("user already exists");
      } else return User.create({ username, password });
    })
    .then((user) => {
      if (user) res.status(200).send("user created");
    })
    .catch(console.log);
};
