import { RequestHandler } from "express";

export const getUserTasks: RequestHandler = (req, res) => {
  const user = req.user;
  res.status(200).send(user?.tasks);
};
export const createTask: RequestHandler = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const user = req.user;
  if (user) {
    const task = user.tasks.create({ title, description, dueDate });
    user.tasks.push(task);
    await user.save();
    res.status(201).send(task);
  }
};

export const updateTask: RequestHandler = async (req, res) => {
  const { _id, ...body } = req.body;
  const user = req.user;
  if (user) {
    const task = user.tasks.id(_id);
    if (task) {
      if (body.title) task.title = body.title;
      if (body.description) task.description = body.description;
      if (body.dueDate) task.dueDate = body.dueDate;
    }
    const updatedUser = await user.save();
    res.status(200).send(updatedUser.tasks.id(_id));
  }
};
export const deleteTask: RequestHandler = async (req, res) => {
  const _id = req.params.id;
  const user = req.user;
  if (user) {
    user.tasks.pull({ _id });
    const updatedUser = await user.save();
    res.status(201).send(updatedUser.tasks);
  }
};
