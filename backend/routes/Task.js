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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    console.log('PUT request received for ID:', req.params.id, req.body);

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
