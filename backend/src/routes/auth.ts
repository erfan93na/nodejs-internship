import express from "express";
import { signIn, signUp } from "../controllers";
export const router = express.Router();

router.post("signup", signUp);
router.post("signin", signIn);
