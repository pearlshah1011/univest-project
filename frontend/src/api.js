import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = async (email, password) => {
  const formData = new FormData();
  formData.append('username', email); // OAuth2 expects 'username' for email
  formData.append('password', password);
  
  const response = await axios.post(`${API_URL}/token`, formData);
  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post('/register', {
    email,
    password,
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

// Meeting APIs
export const createMeeting = async ({ title, transcript }) => {
  const response = await api.post('/meetings/', {
    title,
    transcript,
  });
  return response.data;
};

export const getMeeting = async (meetingId) => {
  const response = await api.get(`/meetings/${meetingId}`);
  return response.data;
};

export const fetchMeetings = async () => {
  const response = await api.get('/meetings/');
  return response.data;
};