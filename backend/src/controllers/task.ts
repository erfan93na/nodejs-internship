import { RequestHandler } from "express";
import { ObjectId } from "mongoose";
import { ITask, ITaskDocument, User } from "../models";
export const getUserTasks: RequestHandler = (req, res) => {
  const user = req.user;
  res.status(200).send(user?.tasks);
};
export const createTask: RequestHandler = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const user = req.user;
  if (user) {
    user.tasks?.push({ title, description, dueDate });
    const result = await user.save();
    res.status(201).send(result.tasks?.at(-1));
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  const body: ITask & { _id: ObjectId } = req.body;

  const user = await User.findOneAndUpdate(
    { "tasks._id": body._id },
    { $set: body },
    { new: true }
  );
  res.status(200).send(user?.tasks);
};
export const deleteTask: RequestHandler = async (req, res) => {
  const taskId = req.params.id;
  const user = req.user;
  if (user)
    user.tasks = user?.tasks?.filter(
      (task) => (task as ITaskDocument)._id !== taskId
    );
  const result = await user?.save();
  res.status(201).send(result?.tasks);
};
