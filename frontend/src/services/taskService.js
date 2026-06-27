import api from '../api/axios';

export const getTasks = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await api.put(`/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};