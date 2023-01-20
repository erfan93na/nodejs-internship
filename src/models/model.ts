import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { required: true, type: String },
  age: { required: true, type: Number },
});
const Person = mongoose.model("Person", personSchema)
export default Person;
