import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes";
import Person from "./models/model";
 
dotenv.config();

const mongoString = process.env.DATABASE_URL;
mongoose.set("strictQuery", false);
let database = null;
if (mongoString) {
  mongoose.connect(mongoString);
  database = mongoose.connection;
}
database?.on("error", console.log);
database?.once("connected", () => {
  console.log("database connected");
});
const app = express();
app.use(express.json());
app.use("/api", routes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
