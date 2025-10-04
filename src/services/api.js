// src/services/api.js
import axios from 'axios';

// Create an axios instance with the backend URL from environment variables
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor to include the JWT token in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set the Authorization header with the Bearer token
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define API calls
const api = {
  // --- Auth ---
  signup: (userData) => apiClient.post('/signup', userData),
  login: (credentials) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    return apiClient.post('/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // --- Expenses ---
  getExpenses: () => apiClient.get('/expenses/'),
  addExpense: (expenseData) => apiClient.post('/expenses/', expenseData),
  updateExpense: (id, expenseData) => apiClient.put(`/expenses/${id}`, expenseData),
  deleteExpense: (id) => apiClient.delete(`/expenses/${id}`),
  
  // --- CSV Export ---
  exportToCSV: () => apiClient.get('/export/csv', { responseType: 'blob' }), // 'blob' for file download
};

export default api;