import express from "express";
import Task from "../models/Task.js";
const router = express.Router();
// CREATE
router.post("/add", async (req, res) => {
  try {
    const task = await Task.create({
      text: req.body.text,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

// READ
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;