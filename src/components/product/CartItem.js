import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Grid,
  Rating,
  Select,
  MenuItem
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';

const getDiscountPercent = (original, price) => {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
};

const CartItem = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const [cartItems, setCartItems] = useState(user?.cartItems || []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.afterDiscountAmount || item.product?.price || 0) * item.quantity, 0);

  // Remove item handler
  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    setUser({ ...user, cartItems: updated });
    localStorage.setItem("user", JSON.stringify({ ...user, cartItems: updated }));
  };

  // Quantity change handler
  const handleQuantityChange = (id, qty) => {
    const updated = cartItems.map(item => item.id === id ? { ...item, quantity: qty } : item);
    setCartItems(updated);
    setUser({ ...user, cartItems: updated });
    localStorage.setItem("user", JSON.stringify({ ...user, cartItems: updated }));
  };

  return (
    <Box sx={{ bgcolor: '#f7f3f3', minHeight: '100vh' }}>
      {/* <Navbar /> */}
      <Grid container justifyContent="center" spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8} lg={7}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Your Cart</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                There are <span style={{ color: '#e53935', fontWeight: 600 }}>{cartItems.length}</span> products in your cart
              </Typography>
              <Divider />
              <List sx={{ width: '100%' }}>
                {cartItems.map((item, idx) => {
                  const product = item.product || {};
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
                      <ListItem alignItems="flex-start" sx={{ py: 3, borderBottom: idx !== cartItems.length - 1 ? '1px solid #eee' : 'none', position: 'relative' }}>
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
                            <Rating value={4} readOnly size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" sx={{ color: '#444', fontWeight: 500 }}>4.0</Typography>
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
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500, display: 'inline-block', mr: 1 }}>Qty:</Typography>
                              <Select
                                size="small"
                                value={item.quantity}
                                onChange={e => handleQuantityChange(item.id, e.target.value)}
                                sx={{ minWidth: 48, fontWeight: 600, borderRadius: 1, background: '#f5f5f5' }}
                              >
                                {[1,2,3,4,5].map(qty => (
                                  <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                                ))}
                              </Select>
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ borderRadius: 3, boxShadow: 2, minWidth: 280 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Cart Totals</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#e53935' }}>₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>Free</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Estimate for</Typography>
                <Typography variant="body1">-</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#e53935' }}>₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: '#ff5a5f',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 2,
                  py: 1.2,
                  mt: 1,
                  '&:hover': { background: '#e53935' },
                  boxShadow: '0px 2px 8px rgba(229,57,53,0.08)'
                }}
                startIcon={<span role="img" aria-label="bag">🛍️</span>}
              >
                CHECKOUT
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
