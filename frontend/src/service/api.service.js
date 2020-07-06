import axios from 'axios';

const SERVER_URL = 'http://localhost:8001/api/v1';
const UNPROTECTED_PATHS = ['register', 'login'];

const api = axios.create({ baseURL: SERVER_URL });

api.interceptors.request.use(async (config) => {
  const isUnprotectedPath = UNPROTECTED_PATHS.filter(p => config.url.endsWith(p));

  if (!isUnprotectedPath || isUnprotectedPath.length === 0) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export { api, SERVER_URL, UNPROTECTED_PATHS };
