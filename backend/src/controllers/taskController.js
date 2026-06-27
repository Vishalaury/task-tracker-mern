const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    dueDate,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};