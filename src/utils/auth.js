// Authentication utility functions

/**
 * Check if user is logged in
 * @returns {boolean} true if user is logged in, false otherwise
 */
export const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return !!(token && user);
};

/**
 * Get current user data from localStorage
 * @returns {Object|null} user object or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Get auth token from localStorage
 * @returns {string|null} token or null if not logged in
 */
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

/**
 * Clear all auth data from localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cartItems');
};

/**
 * Check if user has specific role
 * @param {string} role - role to check (e.g., 'ADMIN', 'CUSTOMER')
 * @returns {boolean} true if user has the role, false otherwise
 */
export const hasRole = (role) => {
  const user = getCurrentUser();
  if (!user || !user.roles) return false;
  return user.roles.some(userRole => userRole.name === role);
}; 