import api from "../utils/axios";

// export const registerUser = (data) => api.post('/api/register', data);

// Fetch all user's address
export const fetchAllUserAddress = () => api.get('/api/v1/user/address/all');

export const fetchSingleAddress = (id) => api.get(`/api/v1/user/address/${id}`);
