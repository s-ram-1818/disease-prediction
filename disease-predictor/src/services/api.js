import axios from 'axios';
import { useLayoutEffect } from 'react';

// Create an instance of axios
const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // return custom error for frontend display
      const errMsg = error.response?.data?.error || "Registration failed.";
      console.log(errMsg);
      throw new Error(errMsg);
      
    }
  },
  sendCode: async (data) => {
  try {
    const response = await api.post('/users/send-code', data); // backend route
    console.log(response);
    return response.data;
  } catch (error) {
    const errMsg = error.response?.data?.error || "Failed to send verification email api.js.";
    console.log(errMsg);
    throw new Error(errMsg);
  }
},

  
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: async () => {
    return await api.get('/users/me');
  },
  
  isLoggedIn: () => {
    return localStorage.getItem('token') !== null;
  }
};

// Prediction services
export const predictionService = {
  // Diabetes prediction
  makeDiabetesPrediction: async (data) => {
    return await api.post('/predictions/diabetes', data);
  },
  
  // Heart disease prediction
  makeHeartDiseasePrediction: async (data) => {
    return await api.post('/predictions/heart', data);
  },

  makeKidneyDiseasePrediction: async (data) => {
    return await api.post('/predictions/kidney', data);
  },
  
  // // Parkinson's disease prediction
  // makeParkinsonsPrediction: async (data) => {
  //   return await api.post('/predictions/parkinsons', data);
  // },
  
  // Get all predictions for current user
  getUserPredictions: async () => {
    return await api.get('/users/predictions');
  },
  
  // Get a specific prediction
  getPrediction: async (id) => {
    return await api.get(`/predictions/${id}`);
  },
  
  // Delete a prediction
  deletePrediction: async (id) => {
    return await api.delete(`/predictions/${id}`);
  }
};

export default { authService, predictionService };