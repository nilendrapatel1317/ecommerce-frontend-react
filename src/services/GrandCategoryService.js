import api from "../utils/axios";

// Fetch a grand category by its ID
export const fetchGrandCategoryById = (id) => api.get(`/api/v1/products/grandCategory/${id}`);

// Update an existing grand category
export const updateGrandCategory = (id, data) => api.put(`/api/v1/grandCategory/${id}`, data);

// Delete a grand category
export const deleteGrandCategory = (id) => api.delete(`/api/v1/grandCategory/${id}`);

// Fetch all grand categories
export const fetchAllGrandCategories = () => api.get('/api/v1/products/grandCategory');

// Create a new grand category
export const createGrandCategory = (data) => api.post('/api/v1/grandCategory', data); 