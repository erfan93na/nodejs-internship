import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
  username: { type: String, required: true },
  passowrd: { type: String, required: true },
  tasks: [
    {
      title: { required: true, type: String },
      description: String,
      dueDate: String,
    },
  ],
});

export const User = mongoose.model("User", UserSchema);
