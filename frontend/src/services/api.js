import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const addSchool = async (schoolData) => {
  const response = await api.post('/addSchool', schoolData);
  return response.data;
};

export const searchSchools = async (latitude, longitude) => {
  const response = await api.get(`/listSchools?latitude=${latitude}&longitude=${longitude}`);
  return response.data;
};

export default api;
