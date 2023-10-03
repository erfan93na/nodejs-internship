import { createTask, updateTask } from "../controllers/";
import express from "express";
import passport from "passport";
export const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.post("/", createTask);
router.put("/", updateTask);
