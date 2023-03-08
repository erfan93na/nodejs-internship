import express from 'express';
import mongoose, { mongo } from 'mongoose';
import path from 'path';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 4000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_KEY ?? '');
const db = mongoose.connection;

db.once('connected', () => {
  console.log('db connected');
});
db.on('error', (error) => {
  console.log(error);
});
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/', router);
app.listen(PORT, () => {
  console.log('Server Started');
});
