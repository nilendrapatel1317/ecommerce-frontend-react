import api from "../utils/axios";

// Fetch an order item by its ID
export const fetchOrderItemById = (id) => api.get(`/api/v1/order-items/${id}`);

// Update an existing order item
export const updateOrderItem = (id, data) => api.put(`/api/v1/order-items/${id}`, data);

// Delete an order item
export const deleteOrderItem = (id) => api.delete(`/api/v1/order-items/${id}`);

// Fetch all order items
export const fetchAllOrderItems = () => api.get('/api/v1/order-items');

// Create a new order item
export const createOrderItem = (data) => api.post('/api/v1/order-items', data);

// Fetch order items by order ID
export const fetchOrderItemsByOrderId = (orderId) => api.get(`/api/v1/order-items/by-order/${orderId}`); 