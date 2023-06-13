import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import { passportConfig } from './utils/';
import { router } from './routes';
import cors from 'cors';
import { handleWebSocket } from './utils/websocket';
const app = express();
dotenv.config();
mongoose.connect(process.env.DB_URI ?? '');
const db = mongoose.connection;
db.on('open', () => {
  console.log('db connected');
});
db.on('error', console.log);
app.use(express.json());
app.use(cors({ origin: 'http://127.0.0.1:5173' }));
passportConfig(passport);
app.use(passport.initialize());
app.use('/api/', router);
handleWebSocket(app);
app.listen(4000, () => {
  console.log('server started');
});
