import express from 'express';
import path from 'path';
import { router } from './routes';

const app = express();
const PORT = 4000;
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/', router);
app.listen(PORT, () => {
  console.log('Server Started');
});
