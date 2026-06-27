const express = require("express");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { validateTask } = require("../validations/taskValidation");

// GET all tasks
// POST create task
router
  .route("/")
  .get(getTasks)
  .post(validateTask, createTask);

// GET single task
// PUT update task
// DELETE task
router
  .route("/:id")
  .get(getTaskById)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;