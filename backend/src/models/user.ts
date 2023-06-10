import mongoose, { Document, Model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
interface IUser {
  username: string;
  password: string;
}
interface IUserDocument extends IUser, Document {
  generateAuthToken: () => string;
}

const userSchema: Schema<IUserDocument> = new Schema({
  username: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});

userSchema.methods.generateAuthToken = function () {
  const payload = { username: this.username };
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, process.env.JWT_KEY!, options);
  return token;
};
export const User = mongoose.model<IUserDocument, Model<IUserDocument>>(
  'User',
  userSchema
);
