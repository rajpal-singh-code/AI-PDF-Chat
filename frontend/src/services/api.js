import axios from 'axios'


const BACKEND_VERCEL_URL = 'https://your-backend-project-name.vercel.app/api';
const LOCAL_URL = 'http://localhost:5000/api';


const API_URL = window.location.hostname === 'localhost' ? LOCAL_URL : BACKEND_VERCEL_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})


API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;