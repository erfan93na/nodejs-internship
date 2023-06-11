import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    sender_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: String,
  },
  {
    timestamps: { createdAt: true },
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
      },
    },
  }
);

export const Message = mongoose.model('Message', messageSchema);
