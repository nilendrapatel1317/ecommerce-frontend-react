import api from "../utils/axios";

// Fetch a parent category by its ID
export const fetchParentCategoryById = (id) => api.get(`/api/v1/parentCategory/${id}`);

// Update an existing parent category
export const updateParentCategory = (id, data) => api.put(`/api/v1/parentCategory/${id}`, data);

// Delete a parent category
export const deleteParentCategory = (id) => api.delete(`/api/v1/parentCategory/${id}`);

// Fetch all parent categories
export const fetchAllParentCategories = () => api.get('/api/v1/parentCategory');

// Create a new parent category
export const createParentCategory = (data) => api.post('/api/v1/parentCategory', data); 