import { ErrorRequestHandler, RequestHandler } from "express";
import { validationResult } from "express-validator";

export const error: ErrorRequestHandler = (error, req, res, next) => {
  console.log(error);
  res.status(500).send({ error: error.message ?? "Error happened" });
};

export const error404: RequestHandler = (req, res) => {
  res.status(404).send({ error: "Path not found" });
};

export const validationErrors: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw Error(errors.formatWith((e) => e.msg).array()[0]);
  next();
};
