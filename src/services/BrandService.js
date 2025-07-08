import api from "../utils/axios";

export const fetchBrandById = (id) => api.get(`/api/v1/brands/${id}`);
export const updateBrand = (id, data) => api.put(`/api/v1/brands/${id}`, data);
export const deleteBrand = (id) => api.delete(`/api/v1/brands/${id}`);
export const fetchAllBrands = () => api.get('/api/v1/brands');
export const createBrand = (data) => api.post('/api/v1/brands', data); 