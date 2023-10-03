import { Response, Request } from "express";
import mongoose, { Mongoose, ObjectId } from "mongoose";
import { ITask, ITaskDocument, User } from "../models";

export const createTask = (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  const user = req.user;
  User.findById(user?.id)
    .then((user) => {
      if (user) {
        user.tasks = [...(user.tasks ?? []), { title, description, dueDate }];
        user.save();
        res.status(201).send(user.tasks.at(-1));
      }
    })
    .catch(console.log);
};

export const updateTask = (req: Request, res: Response) => {
  const body: ITask & { _id: ObjectId } = req.body;
  const setValues = Object.entries(body).reduce(
    (prev, [key, value]) =>
      key === "_id" ? prev : { ...prev, [`tasks.$.${key}`]: value },
    {}
  );
  const user = req.user;
  User.findOneAndUpdate(
    { _id: user?.id, "tasks._id": body._id },
    { $set: setValues },
    { new: true }
  )
    .then((user) => {
      console.log(user);
      res.status(200).send(user?.tasks);
    })
    .catch(console.log);
};
