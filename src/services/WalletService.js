import api from "../utils/axios";

// Use wallet for payment
export const useWallet = (data) => api.post('/api/v1/wallet/use', data);

// Debit money from wallet
export const debitWallet = (data) => api.post('/api/v1/wallet/debit', data);

// Credit money to wallet
export const creditWallet = (data) => api.post('/api/v1/wallet/credit', data);

// Fetch wallet transactions
export const fetchWalletTransactions = () => api.get('/api/v1/wallet/transactions');

// Fetch current user's wallet
export const fetchMyWallet = () => api.get('/api/v1/wallet/my');

// Fetch all wallet transactions for admin
export const fetchAllWalletTransactions = () => api.get('/api/v1/wallet/all/transactions');

// Delete a wallet transaction
export const deleteWalletTransaction = (id) => api.delete(`/api/v1/wallet/transactions/delete/${id}`); 