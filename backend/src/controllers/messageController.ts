import { Request, Response } from 'express';
import { Message } from '../models';

export const getMessagesOfTwoUsers = async (req: Request, res: Response) => {
  const { firstUserId, secondUserId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { receiver_id: firstUserId, sender_id: secondUserId },
        { sender_id: firstUserId, receiver_id: secondUserId },
      ],
    });
    res.status(200).send(messages);
  } catch {
    res.status(500).send('server error');
  }
};

export const postMessage = async (req: Request, res: Response) => {
  const { sender_id, receiver_id, text } = req.body;
  try {
    await Message.create({ sender_id, receiver_id, text });
    res.status(200).send('Message Created');
  } catch (e) {
    res.status(500).send('server error');
  }
};
