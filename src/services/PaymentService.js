import api from "../utils/axios";

// Get payment by ID
export const fetchPaymentById = (id) => api.get(`/api/v1/payments/${id}`);

// Update payment
export const updatePayment = (id, data) => api.put(`/api/v1/payments/${id}`, data);

// Delete payment
export const deletePayment = (id) => api.delete(`/api/v1/payments/${id}`);

// Get all payments
export const fetchAllPayments = () => api.get('/api/v1/payments');

// Create payment
export const createPayment = (data) => api.post('/api/v1/payments', data);

// Razorpay: verify payment
export const verifyRazorpayPayment = (data) => api.post('/api/v1/payments/razorpay/verify', data);

// Razorpay: create order
export const createRazorpayOrder = (data) => api.post('/api/v1/payments/razorpay/order', data);

// Razorpay: create order by order id
export const createRazorpayOrderByOrderId = (data) => api.post('/api/v1/payments/razorpay/order/by-order-id', data);

// Update payment status
export const updatePaymentStatus = (paymentId, data) => api.patch(`/api/v1/payments/${paymentId}/status`, data);

// Get payments by order id
export const fetchPaymentsByOrderId = (orderId) => api.get(`/api/v1/payments/by-order/${orderId}`); 