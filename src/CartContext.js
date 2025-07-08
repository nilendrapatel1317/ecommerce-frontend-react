import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { fetchAllCartItems, addCartItem, removeCartItem } from './services/CartItemService';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync cart from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetchAllCartItems();
        const arr = Array.isArray(res.data) ? res.data : [];
        setCartItems(arr);
        updateCartInLocalStorage(arr);
      } catch (e) {
        setCartItems([]);
        updateCartInLocalStorage([]);
      }
    };
    fetchCart();
  }, []);

  // Helper to update cart in localStorage and notify Navbar
  const updateCartInLocalStorage = (cartArray) => {
    const safeArray = Array.isArray(cartArray) ? cartArray : [];
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user.cartItems = safeArray;
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('loginStatusChanged'));
    }
  };

  // Add to cart
  const addToCart = useCallback(async (product) => {
    setLoading(true);
    try {
      await addCartItem({ product: { id: product.id }, quantity: 1 });
      toast.success('Added to cart!');
      const res = await fetchAllCartItems();
      const arr = Array.isArray(res.data) ? res.data : [];
      setCartItems(arr);
      updateCartInLocalStorage(arr);
    } catch (err) {
      toast.error('Failed to add to cart');
    }
    setLoading(false);
  }, []);

  // Remove from cart
  const removeFromCart = useCallback(async (productId) => {
    setLoading(true);
    try {
      const cartItem = cartItems.find((item) => item.productId === productId);
      if (!cartItem) {
        toast.error('Cart item not found');
        setLoading(false);
        return;
      }
      await removeCartItem(cartItem.id);
      toast.success('Removed from cart!');
      const res = await fetchAllCartItems();
      const arr = Array.isArray(res.data) ? res.data : [];
      setCartItems(arr);
      updateCartInLocalStorage(arr);
    } catch (err) {
      toast.error('Failed to remove from cart');
    }
    setLoading(false);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}; 