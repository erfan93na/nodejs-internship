import express from "express";
import expressAsyncHandler from "express-async-handler";
import { signIn, signUp, validationErrors } from "../controllers";
import {
  signIn as signInValidator,
  signUp as signUpValidator,
} from "../validators";

export const router = express.Router();

router.post(
  "/signup",
  signUpValidator,
  validationErrors,

  expressAsyncHandler(signUp)
);
router.post(
  "/signin",
  signInValidator,
  validationErrors,

  expressAsyncHandler(signIn)
);
