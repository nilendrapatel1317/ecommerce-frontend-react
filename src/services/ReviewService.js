import api from "../utils/axios";

// Edit a review
export const editReview = (id, data) => api.put(`/api/v1/reviews/edit/${id}`, data);

// Add a new review
export const addReview = (data) => api.post('/api/v1/reviews', data);

// Add photos to a review
export const addReviewPhotos = (reviewId, data) => api.post(`/api/v1/reviews/addPhotos/${reviewId}`, data);

// Fetch all reviews
export const fetchAllReviews = () => api.get('/api/v1/reviews/all');

// Delete a review photo
export const deleteReviewPhoto = (reviewId, photoId) => api.delete(`/api/v1/reviews/${reviewId}/deletePhoto/${photoId}`);

// Delete a review
export const deleteReview = (id) => api.delete(`/api/v1/reviews/delete/${id}`); 