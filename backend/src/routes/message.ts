import express from 'express';
import { getMessagesOfTwoUsers, postMessage } from '../controllers';
export const router = express.Router();
router.get('/:firstUserId/:secondUserId', getMessagesOfTwoUsers);
router.post('/', postMessage);
