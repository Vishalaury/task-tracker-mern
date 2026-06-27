const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();

// =======================
// Global Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// =======================
// Health Check Route
// =======================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API is running successfully 🚀",
  });
});

// =======================
// API Routes
// =======================
app.use("/api/tasks", taskRoutes);

// =======================
// Error Handling Middleware
// =======================
app.use(notFound);
app.use(errorHandler);

module.exports = app;