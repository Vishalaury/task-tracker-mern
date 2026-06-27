import React from 'react';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate pr-2">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mt-4 border-t pt-3">
        <span>Due: {task.dueDate ? format(new Date(task.dueDate), 'dd MMM, yyyy') : 'No Date'}</span>
        
        <div className="flex space-x-3">
          <button onClick={() => onEdit(task)} className="text-blue-500 hover:text-blue-700 transition">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="text-red-500 hover:text-red-700 transition">
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;