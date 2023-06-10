import express from 'express';
import { getUsers } from '../controllers';
export const router = express.Router();
router.get('/', getUsers);
