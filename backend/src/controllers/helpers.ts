import { ErrorRequestHandler } from "express";

export const error: ErrorRequestHandler = (error, req, res, next) => {
  res.status(500).send({ message: error.message ?? "Error happened" });
};
