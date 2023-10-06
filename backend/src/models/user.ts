import mongoose, { Schema, Document, Types, Model } from "mongoose";
export interface ITask {
  title: string;
  description?: string;
  dueDate: string;
  _id: Types.ObjectId;
}
export interface IUser {
  username: string;
  password: string;
  tasks: ITask[];
}
type UserDocumentProps = {
  tasks: Types.DocumentArray<ITask>;
};
export type UserModelType = Model<
  IUser,
  Record<string, never>,
  UserDocumentProps
>;
const TaskSchema = new Schema<ITask>({
  title: String,
  description: String,
  dueDate: String,
});
const UserSchema = new Schema<IUser, UserModelType>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tasks: [TaskSchema],
});

export const User = mongoose.model<IUser, UserModelType>("User", UserSchema);
const user = new User();
export type UserDocument = typeof user;
export type TaskDocument = (typeof user.tasks)[number];
