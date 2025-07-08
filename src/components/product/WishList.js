import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, IconButton, Rating } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { deleteWishlistItem } from '../../services/WishlistService';
import { fetchUserProfile } from '../../services/UserService';
import toast from "react-hot-toast";

const getDiscountPercent = (original, price) => {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
};

const WishList = ({ user }) => {
  const [wishlist, setWishlist] = useState(Array.isArray(user?.wishlist) ? user.wishlist : []);

  useEffect(() => {
    setWishlist(Array.isArray(user?.wishlist) ? user.wishlist : []);
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await deleteWishlistItem(id);
      toast.success('Item removed from wishlist!');
      // Fetch updated user profile
      const res = await fetchUserProfile();
      const updatedUser = res?.data?.data;
      if (updatedUser) {
        setWishlist(Array.isArray(updatedUser.wishlist) ? updatedUser.wishlist : []);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Notify Navbar and others
        window.dispatchEvent(new Event("loginStatusChanged"));
      }
    } catch (err) {
      toast.error('Failed to remove item from wishlist');
    }
  };

  return (
    <Box sx={{padding:3}}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>My WishList Items</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        There {wishlist.length === 1 ? 'is' : 'are'} <span style={{ color: '#e53935', fontWeight: 600 }}>{wishlist.length}</span> product{wishlist.length === 1 ? '' : 's'} in your WishList
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {wishlist.length === 0 ? (
        <Typography color="text.secondary">No items in your wishlist.</Typography>
      ) : (
        <List>
          {wishlist.map((item, idx) => {
            const product = item.product || item; // support both {product: {...}} and direct product
            const brand = product.brand?.name || '';
            const name = product.name || 'Product';
            const image = product.photos?.[0]?.url || 'https://via.placeholder.com/100x80?text=No+Image';
            const price = product.afterDiscountAmount || product.price || 0;
            const original = product.originalPrice || product.price || 0;
            const discount = getDiscountPercent(original, price);
            return (
              <motion.div
                key={item.id || idx}
                whileHover={{ scale: 1.01, boxShadow: "0px 4px 16px rgba(0,0,0,0.10)" }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ borderRadius: 12, marginBottom: 8 }}
              >
                <ListItem alignItems="flex-start" sx={{ py: 3, borderBottom: idx !== wishlist.length - 1 ? '1px solid #eee' : 'none', position: 'relative' }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={image}
                      alt={name}
                      sx={{ width: 100, height: 80, mr: 2, borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="caption" sx={{ color: '#888', fontWeight: 600, letterSpacing: 1 }}>{brand.toUpperCase()}</Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={5} readOnly size="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" sx={{ color: '#444', fontWeight: 500 }}>5.0</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 18 }}>₹{price}</Typography>
                        {original > price && (
                          <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#888', ml: 1 }}>
                            ₹{original}
                          </Typography>
                        )}
                        {discount && (
                          <Typography variant="body2" sx={{ color: '#e53935', fontWeight: 600, ml: 1 }}>{discount}% OFF</Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <IconButton onClick={() => handleRemove(item.id)} sx={{ position: 'absolute', top: 12, right: 8 }}>
                    <CloseIcon sx={{ color: '#444' }} />
                  </IconButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default WishList;