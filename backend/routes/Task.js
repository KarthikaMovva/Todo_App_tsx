const express = require("express");
const Todo = require("../models/Task");
const authMiddleware = require("../middleware/Middleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post("/", authMiddleware, async (req, res) => {
  const todo = await Todo.create({ ...req.body, userId: req.userId });
  res.json(todo);
});

router.put("/:id", authMiddleware, async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(todo);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
