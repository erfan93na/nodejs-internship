import {
  createTask,
  updateTask,
  getUserTasks,
  deleteTask,
} from "../controllers/";
import express from "express";
import passport from "passport";
import expressAsyncHandler from "express-async-handler";
export const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.get("/", expressAsyncHandler(getUserTasks));
router.post("/", expressAsyncHandler(createTask));
router.patch("/", expressAsyncHandler(updateTask));
router.delete("/:id", expressAsyncHandler(deleteTask));
