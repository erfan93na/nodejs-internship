import { body, param } from "express-validator";

export const createTask = [
  body("title").exists({ values: "falsy" }).withMessage("Title is missing"),
  body("dueDate").exists({ values: "falsy" }).withMessage("DueDate is missing"),
  body("description")
    .exists({ values: "falsy" })
    .withMessage("Description should have a correct value")
    .optional(),
];
export const updateTask = [
  body("title")
    .exists({ values: "falsy" })
    .withMessage("Title should have a correct value")
    .optional(),
  body("dueDate")
    .exists({ values: "falsy" })
    .withMessage("DueDate should have a correct value")
    .optional(),
  body("_id").exists({ values: "falsy" }).withMessage("id is missing"),
  body("description")
    .exists({ values: "falsy" })
    .withMessage("Description should have a correct value")
    .optional(),
];
export const deleteTask = [
  param("id").exists({ values: "falsy" }).withMessage("id is missing"),
];
