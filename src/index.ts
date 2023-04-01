import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
dotenv.config();
mongoose.connect(process.env.DB_URI ?? '');
const db = mongoose.connection;
db.on('open', () => {
  console.log('db connected');
});
db.on('error', console.log);
app.listen(4000, () => {
  console.log('server started');
});
