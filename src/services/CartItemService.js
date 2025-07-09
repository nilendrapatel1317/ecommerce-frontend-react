import api from "../utils/axios";

// Add an item to the cart
export const addCartItem = (data) => api.post('/api/v1/user/cart-items/add', data);

// Update quantity of item into cart
export const updateQuantity = (data) => api.post('/api/v1/user/cart-items/update-quantity', data);

// Fetch all cart items
export const fetchAllCartItems = () => api.get('/api/v1/user/cart-items/all');

// Remove a cart item
export const removeCartItem = (id) => api.delete(`/api/v1/user/cart-items/remove/${id}`);



// Check if user can access cart (for debugging)
export const checkCartAccess = () => api.get('/api/v1/user/cart-items/all'); 