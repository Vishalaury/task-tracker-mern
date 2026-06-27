import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const TaskForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    dueDate: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Frontend Validation
    if (formData.title.trim().length < 3) {
      return toast.error('Title must be at least 3 characters long');
    }
    if (formData.description.trim().length < 5) {
      return toast.error('Description must be at least 5 characters long');
    }

    onSubmit(formData);
    if (!initialData) {
      setFormData({ title: '', description: '', status: 'Pending', dueDate: '' }); // Reset on create
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {initialData ? 'Update Task' : 'Create New Task'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter task description"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;