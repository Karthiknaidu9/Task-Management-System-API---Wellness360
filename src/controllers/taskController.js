const tasks = require("../models/taskModel");
const { v4: uuidv4 } = require("uuid");

// GET /tasks
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// GET /tasks/:id
exports.getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  task ? res.json(task) : res.status(404).json({ error: "Task not found" });
};

// POST /tasks
exports.createTask = (req, res) => {
  const { title, description, due_date } = req.body;
  if (!title || !due_date) {
    return res.status(400).json({ error: "Title and due_date are required" });
  }
  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    due_date,
    status: "pending",
    created_at: new Date(),
    updated_at: new Date(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT /tasks/:id
exports.updateTask = (req, res) => {
  const { title, description, due_date, status } = req.body;
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  Object.assign(task, {
    title: title || task.title,
    description: description || task.description,
    due_date: due_date || task.due_date,
    status: status || task.status,
    updated_at: new Date(),
  });
  res.json(task);
};

// DELETE /tasks/:id
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(index, 1);
  res.status(204).send();
};

// PATCH /tasks/:id/complete
exports.markTaskComplete = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.status = "completed";
  task.updated_at = new Date();
  res.json(task);
};
