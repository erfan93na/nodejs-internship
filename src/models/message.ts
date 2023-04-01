import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    sender_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    receiver_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    text: String,
  },
  { timestamps: { createdAt: true } }
);

export const Message = mongoose.model('Message', messageSchema);
