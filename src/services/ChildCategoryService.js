import api from "../utils/axios";

// Fetch a child category by its ID
export const fetchChildCategoryById = (id) => api.get(`/api/v1/childCategory/${id}`);

// Update an existing child category
export const updateChildCategory = (id, data) => api.put(`/api/v1/childCategory/${id}`, data);

// Delete a child category
export const deleteChildCategory = (id) => api.delete(`/api/v1/childCategory/${id}`);

// Fetch all child categories
export const fetchAllChildCategories = () => api.get('/api/v1/childCategory');

// Create a new child category
export const createChildCategory = (data) => api.post('/api/v1/childCategory', data); 