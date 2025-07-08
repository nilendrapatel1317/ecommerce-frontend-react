import api from "../utils/axios";

// export const registerUser = (data) => api.post('/api/register', data);

// Fetch all user's address
export const fetchAllUserAddress = () => api.get('/api/v1/user/address/all');

export const fetchSingleAddress = (id) => api.get(`/api/v1/user/address/${id}`);

// Create a new address
export const createUserAddress = (data) => api.post('/api/v1/user/address', data);

// Update an address
export const updateUserAddress = (id, data) => api.put(`/api/v1/user/address/${id}`, data);

// Delete an address (soft delete)
export const deleteUserAddress = (id) => api.delete(`/api/v1/user/address/delete/${id}`);

// Restore a deleted address
export const restoreUserAddress = (id) => api.get(`/api/v1/user/address/restore/${id}`);
