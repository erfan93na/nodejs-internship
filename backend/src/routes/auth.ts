import express from "express";
import expressAsyncHandler from "express-async-handler";
import { signIn, signUp } from "../controllers";
export const router = express.Router();

router.post("/signup", expressAsyncHandler(signUp));
router.post("/signin", expressAsyncHandler(signIn));
