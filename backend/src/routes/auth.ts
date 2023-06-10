import express from 'express';
import { signin, signup } from '../controllers';

export const router = express.Router();
router.post('/signin', signin);
router.post('/signup', signup);
