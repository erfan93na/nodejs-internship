import express from "express";
import Person from "../models/model";
import { body } from "express-validator";
import { createUserValidations } from "../validations/people/create";
const router = express.Router();
router.post("/post", ...createUserValidations, async (req, res) => {
  console.log(3)
  const { name, age } = req.body;
  const person = new Person({ name, age });
  try {
    const savedPerson = await person.save();
    res.status(200).json(savedPerson);
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ message: e?.message ?? "" });
  }
});
router.get("/getAll", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e?.message ?? "" });
  }
});
router.get("/getOne/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const person = await Person.findById(id);
    res.status(200).json(person);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ message: e?.message ?? "" });
  }
});
router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const person = await Person.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(person);
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ message: e?.message ?? "" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndDelete(id);
    res.status(200).json(`Person with id ${id} deleted`);
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ message: e?.message ?? "" });
  }
});

export default router;
