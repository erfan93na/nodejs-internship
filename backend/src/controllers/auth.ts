import { Request, Response } from "express";
import { generateJwtToken } from "../configs/jwt";
import { User } from "../models";

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generateJwtToken({ sub: user.username });

    res.status(200).send({ token });
  } else res.status(400).send("user not found");
};

export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(400).send("user already exists");
  }
  const createdUser = await User.create({ username, password });
  if (createdUser) res.status(200).send("user created");
};
