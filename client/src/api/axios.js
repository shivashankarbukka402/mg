import axios from 'axios';

// In k8s, set VITE_API_URL at build time to your backend service/ingress URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('medstore_user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
