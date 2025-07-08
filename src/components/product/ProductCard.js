import React, { useState, useEffect } from "react";
import { Paper, Box, Typography, Chip, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  addCartItem,
  removeCartItem,
  fetchAllCartItems,
} from "../../services/CartItemService";
import { toast } from "react-hot-toast";
import { isLoggedIn } from "../../utils/auth";
import LoginPrompt from "../common/LoginPrompt";
import { South } from "@mui/icons-material";

const ProductCard = ({
  product,
  DUMMY_IMAGE,
}) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  
  useEffect(() => {
    const handler = () => setUser(JSON.parse(localStorage.getItem('user')));
    window.addEventListener('loginStatusChanged', handler);
    return () => window.removeEventListener('loginStatusChanged', handler);
  }, []);
  
  const cartProductIds = Array.isArray(user?.cartItems) ? user.cartItems.map(item => item?.product?.id) : [];
  const [inCart, setInCart] = useState(false || cartProductIds.includes(product.id))

  console.log(inCart)

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      setShowLoginPrompt(true);
      return;
    }
    setLoading(true);
    try {
      await addCartItem({ product: { id: product?.id }, quantity: 1 });
      setInCart(true);
      window.dispatchEvent(new Event('loginStatusChanged'));
      
    } catch (e) {}
    setLoading(false);
  };

  const handleRemoveFromCart = async () => {
    if (!isLoggedIn()) {
      setShowLoginPrompt(true);
      return;
    }
    setLoading(true);
    try {
      const cartItem = user.cartItems.find((item) => item?.product?.id === product.id);
      if (cartItem) {
        await removeCartItem(cartItem.id);
        setInCart(false);
        window.dispatchEvent(new Event('loginStatusChanged'));
      }
    } catch (e) {}
    setLoading(false);
  };

  const discount = product.discountPercentage || 0;
  const hasDiscount = discount > 0 && product.originalPrice > product.afterDiscountAmount;
  return (
    <>
      <Paper
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Discount badge */}
        {hasDiscount && (
          <Chip
            label={`-${Math.round(discount)}%`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 2,
            }}
          />
        )}
        {/* Product image */}
        <Box
          sx={{
            width: "100%",
            height: 180,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 2,
            background: "#f7f7f7",
          }}
        >
          <img
            src={DUMMY_IMAGE}
            alt={product.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        {/* Product info */}
        <Typography variant="subtitle2" fontWeight={300} noWrap>
          {product.brand?.name || ""}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
          title={product.name}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          title={product.description}
        >
          {product.description}
        </Typography>
        {/* Star rating */}
        <Box display="flex" alignItems="center" mt={1} mb={1}>
          {[...Array(Math.round(product.rating || 4))].map((_, i) => (
            <StarIcon key={i} sx={{ color: "#fbc02d" }} fontSize="small" />
          ))}
        </Box>
        {/* Price */}
        <Box display="flex" alignItems="center" gap={1}>
          {hasDiscount && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₹{product.originalPrice}
            </Typography>
          )}
          <Typography variant="h6" color="error.main">
            ₹{product.afterDiscountAmount}
          </Typography>
        </Box>
        {/* Add/Remove Cart button */}
        <Button
          variant={inCart ? "contained" : "outlined"}
          color={inCart ? "error" : "primary"}
          startIcon={<ShoppingCartIcon />}
          sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }}
          fullWidth
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
          disabled={loading}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </Paper>

      {/* Login Prompt Dialog */}
      <LoginPrompt
        open={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLogin={() => {
          setShowLoginPrompt(false);
          // Navigate to login page - you can use your router here
          window.location.href = "/login";
        }}
        action="add items to cart"
      />
    </>
  );
};

export default ProductCard;
