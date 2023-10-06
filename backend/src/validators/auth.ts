import { body } from "express-validator";

export const signUp = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Username is missing"),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Password is missing")
    .isLength({ min: 6 })
    .withMessage("Must be at least 6 chars long"),
];
export const signIn = [
  body("username")
    .exists({ values: "falsy" })
    .withMessage("Username is missing"),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Password is missing"),
];
