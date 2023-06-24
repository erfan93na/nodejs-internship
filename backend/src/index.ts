import { handlePassportJwt } from "./configs/jwt";
import passport from "passport";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
handlePassportJwt(passport);
const app = express();

app.use(express.json());
app.use(passport.initialize());
mongoose
  .connect(process.env.DB_URI ?? "")
  .then(() => {
    console.log("db connect");
  })
  .catch(console.log);
app.listen(4000, () => {
  console.log("server connected");
});
