import { error, error404 } from "./controllers/";
import { handlePassportJwt } from "./configs/jwt";
import passport from "passport";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { router } from "./routes";
dotenv.config();

handlePassportJwt(passport, process.env.JWT_KEY ?? "");
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(router);
app.use(error);
app.use(error404);
mongoose
  .connect(process.env.DB_URI ?? "")
  .then(() => {
    console.log("db connect");
  })
  .catch(console.log);
app.listen(4000, () => {
  console.log("server connected");
});
