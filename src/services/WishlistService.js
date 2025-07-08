import api from "../utils/axios";

// Add an item to the wishlist
export const addWishlistItem = (data) => api.post('/api/v1/user/wishlist-items', data);

// Fetch all wishlist items
export const fetchAllWishlistItems = () => api.get('/api/v1/user/wishlist-items/all');

// Delete a wishlist item
export const deleteWishlistItem = (id) => api.delete(`/api/v1/user/wishlist-items/delete/${id}`); 