const express = require("express");
const Todo = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

router.post("/", async (req, res) => {
  const todo = await Todo.create({ ...req.body });
  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
