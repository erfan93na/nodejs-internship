import mongoose, { Schema, Document } from "mongoose";
export interface ITask {
  title: string;
  description?: string;
  dueDate: string;
}
export interface IUser {
  username: string;
  password: string;
  tasks?: ITask[];
}
export interface ITaskDocument extends ITask, Document {}
export interface IUserDocument extends IUser, Document {}
const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [
    {
      title: { required: true, type: String },
      description: String,
      dueDate: { required: true, type: String },
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
