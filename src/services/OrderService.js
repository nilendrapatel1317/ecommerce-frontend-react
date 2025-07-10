import api from "../utils/axios";

// Fetch an order by its ID
export const fetchOrderById = (id) => api.get(`/api/v1/orders/${id}`);

// Update an existing order
export const updateOrder = (id, data) => api.put(`/api/v1/orders/${id}`, data);

// Delete an order
export const deleteOrder = (id) => api.delete(`/api/v1/orders/${id}`);

// Fetch all orders
export const fetchAllOrders = () => api.get('/api/v1/orders');

// Create a new order
export const createOrder = (data) => api.post('/api/v1/user/orders', data);

// cancel order
export const cancelOrder = (orderId) => api.get(`/api/v1/user/orders/cancel-order/${orderId}`)

// Place a new order
export const placeOrder = (data) => api.post('/api/v1/orders/place', data);

// Update order status
export const updateOrderStatus = (orderId, data) => api.patch(`/api/v1/orders/${orderId}/status`, data);

// Fetch order by order ID
export const fetchOrderByOrderId = (orderId) => api.get(`/api/v1/orders/${orderId}`);

// Fetch current user's orders
export const fetchMyOrders = () => api.get('/api/v1/orders/my');

// Fetch all orders for admin
export const fetchAllOrdersAdmin = () => api.get('/api/v1/orders/all'); 