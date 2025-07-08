import api from "../utils/axios";

// Fetch products with filters, pagination, sorting, etc.
export const fetchProducts = (params) => api.get('/api/v1/products', { params });

// Fetch single product by ID
export const fetchProductById = (id) => api.get(`/api/v1/products/${id}`);

// Update a product
export const updateProduct = (id, data) => api.put(`/api/v1/products/${id}`, data);

// Delete a product
export const deleteProduct = (id) => api.delete(`/api/v1/products/${id}`);

// Create a new product
export const createProduct = (data) => api.post('/api/v1/products', data);

// Add photos to a product
export const addProductPhotos = (data) => api.post('/api/v1/products/addPhotos', data);

// Fetch recent products
export const fetchRecentProducts = () => api.get('/api/v1/products/recent');

// Delete a product photo
export const deleteProductPhoto = (productId, photoId) => api.delete(`/api/v1/products/${productId}/deletePhoto/${photoId}`);

