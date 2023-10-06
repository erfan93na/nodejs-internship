import {
  createTask,
  updateTask,
  getUserTasks,
  deleteTask,
  validationErrors,
} from "../controllers/";
import {
  createTask as createTaskValidator,
  updateTask as updateTaskValidator,
  deleteTask as deleteTaskValidator,
} from "../validators/";
import express from "express";
import passport from "passport";
import expressAsyncHandler from "express-async-handler";
export const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", expressAsyncHandler(getUserTasks));
router.post(
  "/",
  createTaskValidator,
  validationErrors,
  expressAsyncHandler(createTask)
);
router.patch(
  "/",
  updateTaskValidator,
  validationErrors,
  expressAsyncHandler(updateTask)
);
router.delete(
  "/:id?",
  deleteTaskValidator,
  validationErrors,
  expressAsyncHandler(deleteTask)
);
