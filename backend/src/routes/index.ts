import express from "express";
import { router as authRouter } from "./auth";
import { router as taskRouter } from "./task";

export const router = express.Router();

router.use("/", authRouter);
router.use("/task", taskRouter);
