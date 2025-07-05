import api from "../utils/axios";

// Login
export const loginUser = (credentials) => api.post('/api/v1/login', credentials);

// Register
export const registerUser = (data) => api.post('/api/v1/register', data);

// Fetch profile
export const fetchUserProfile = () => api.get('/api/v1/user/profile');

// Change password
export const changePassword = (payload) => api.post('/api/v1/change-password', payload);

// Logout
export const logoutUser = () => api.get('/api/v1/logout');

// Test API (example)
export const testAPI = () => api.get('/api/v1/products');