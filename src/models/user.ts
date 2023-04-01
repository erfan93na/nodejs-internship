import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
  name: { type: String, unique: true },
});

export const User = mongoose.model('User', userSchema);
