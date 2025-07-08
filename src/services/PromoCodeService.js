import api from "../utils/axios";

// Update a promo code
export const updatePromoCode = (id, data) => api.put(`/api/v1/promocode/update/${id}`, data);

// Remove a promo code (POST)
export const removePromoCode = (data) => api.post('/api/v1/promocode/remove', data);

// Create a new promo code
export const createPromoCode = (data) => api.post('/api/v1/promocode/create', data);

// Apply a promo code
export const applyPromoCode = (data) => api.post('/api/v1/promocode/apply', data);

// Deactivate a promo code
export const deactivatePromoCode = (id) => api.get(`/api/v1/promocode/deactivate/${id}`);

// Activate a promo code
export const activatePromoCode = (id) => api.get(`/api/v1/promocode/activate/${id}`);

// Delete a promo code
export const deletePromoCode = (id) => api.delete(`/api/v1/promocode/delete/${id}`); 