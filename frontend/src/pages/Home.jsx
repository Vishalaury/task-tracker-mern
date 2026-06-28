import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  // Bonus Features: Filtering and Sorting
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const response = await getTasks();
      // BUG FIX: Ensuring tasks is always an array to prevent "not iterable" crashes
      const fetchedTasks = Array.isArray(response.data)
        ? response.data
        : response.data?.tasks || response.data?.data || [];
      setTasks(fetchedTasks);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        const res = await updateTask(editingTask._id, formData);
        
        // Dynamic Update without refresh (Mandatory)
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask._id ? res.data : task
          )
        );
        toast.success("Task updated successfully");
        setEditingTask(null);
      } else {
        const res = await createTask(formData);
        
        // Dynamic Update without refresh (Mandatory)
        setTasks((prevTasks) => [res.data, ...prevTasks]);
        toast.success("Task created successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      
      // Dynamic Update without refresh (Mandatory)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  // BUG FIX: Safe array spread
  let displayedTasks = Array.isArray(tasks) ? [...tasks] : [];

  // Dynamic Filtering (Bonus Feature)
  if (filter !== "All") {
    displayedTasks = displayedTasks.filter((task) => task.status === filter);
  }

  // Dynamic Sorting (Bonus Feature)
  displayedTasks.sort((a, b) => {
    return sort === "Newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt);
  });

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <TaskForm
          onSubmit={handleCreateOrUpdate}
          initialData={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        {/* Filter & Sort Controls (Bonus Features) */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-600">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 border rounded-lg outline-none text-sm w-full sm:w-auto"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-sm font-medium text-gray-600">Sort By:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-lg outline-none text-sm w-full sm:w-auto"
            >
              <option value="Newest">Newest First</option>
              <option value="Oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Task List & Loading States */}
        {loading ? (
          <Loader />
        ) : displayedTasks.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(taskData) => {
                  setEditingTask(taskData);
                  window.scrollTo({ top: 0, behavior: "smooth" }); // Good UX
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;