import { Express } from 'express';
import expressWs from 'express-ws';
import { Message } from '../models';
export const handleWebSocket = (server: Express) => {
  const app = expressWs(server).app;
  app.ws('/chat-ws', (ws) => {
    console.log('ws connected');
    let userId1 = '',
      userId2 = '';
    ws.on('message', (data: string) => {
      const parsed = JSON.parse(data);
      if (parsed.type === 'new-chat-started') {
        const { userId1: id1, userId2: id2 } = JSON.parse(data).payload;
        userId1 = id1;
        userId2 = id2;
      }
    });

    ws.on('close', console.log);
    const messagesChangeStream = Message.watch();
    messagesChangeStream.on('change', (change) => {
      if (change.operationType === 'insert') {
        const document = change.fullDocument;
        if (
          (document.sender_id.toString() === userId1 &&
            document.receiver_id.toString() === userId2) ||
          (document.sender_id.toString() === userId2 &&
            document.receiver_id.toString() === userId1)
        )
          ws.send(
            JSON.stringify({
              type: 'new-chat-message',
              payload: document,
            })
          );
      }
    });
  });
};
