import express from "express";
import {
  Request,
  Response,
} from "./../../../node_modules/@types/express-serve-static-core/index.d";
import { body, validationResult } from "express-validator";
import Person from "../../models/model";
export const createUserValidations = [
  body("name")
    .notEmpty()
    .withMessage("name should not be empty")
    .isAlpha()
    .withMessage("name should be only alphabet")
    .isLength({ max: 10 })
    .withMessage("name should not be more than 10 chars")
    .custom(async (input) => {
      const person = await Person.findOne({ name: input });
      if (person) throw Error("Person exists");
    }),
  body("age")
    .notEmpty()
    .withMessage("age should not be empty")
    .isNumeric()
    .withMessage("age should be a number")
    .isInt({ min: 3 })
    .withMessage("Person is too small"),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
