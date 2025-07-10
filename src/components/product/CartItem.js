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
  Modal
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { removeCartItem, updateQuantity } from "../../services/CartItemService";
import { fetchUserProfile } from "../../services/UserService";
import toast from "react-hot-toast";
import {
  ArrowBack,
  ArrowForward,
  ArrowForwardIos,
  LocalOffer,
} from "@mui/icons-material";
import PromoCodeModal from "./PromoCodeModal";
import { applyPromoCode, removePromoCode } from "../../services/PromoCodeService";
import { fetchAllUserAddress } from "../../services/AddressService";
import { createOrder, cancelOrder } from "../../services/OrderService";

const getDiscountPercent = (original, price) => {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
};

const CartItem = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const [cartItems, setCartItems] = useState(user?.cartItems || []);
  const [promoOpen, setPromoOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null); // { code, discountAmount }
  const [payable, setPayable] = useState(null); // subtotal + delivery - discount

  // Address selection modal state
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentModeModalOpen, setPaymentModeModalOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null); // store created order
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.afterDiscountAmount || item.product?.price || 0) *
        item.quantity,
    0
  );
  const delivery = 40;
  const discount = appliedPromo?.discountAmount || 0;
  const totalPayable = subtotal + delivery - discount;

  // Remove item handler
  const handleRemove = async (id) => {
    try {
      await removeCartItem(id);
      toast.success("Item removed from cart!");
      // Fetch updated user profile
      const res = await fetchUserProfile();
      const updatedUser = res?.data?.data;
      if (updatedUser) {
        setCartItems(updatedUser.cartItems || []);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Notify Navbar and others
        window.dispatchEvent(new Event("loginStatusChanged"));
      }
    } catch (err) {
      toast.error("Failed to remove item from cart");
    }
  };

  // Quantity change handler (increment/decrement)
  const handleQuantityChange = async (id, status) => {
    try {
      const updateRes = await updateQuantity({
        cartItemId: id,
        quantityStatus: status,
      });
      toast.success(updateRes?.data?.message);
      // Fetch updated user profile
      const res = await fetchUserProfile();
      const updatedUser = res?.data?.data;
      if (updatedUser) {
        setCartItems(updatedUser.cartItems || []);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("loginStatusChanged"));
      }
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  // Handle promo apply callback from modal
  const handleApplyPromo = (promoData, promo) => {
    // promoData is backend response, promo is promo object
    // You may need to extract discount amount from promoData
    let discountAmount = 0;
    if (promoData.discountAmount) {
      discountAmount = promoData.discountAmount;
    } else if (promo.discountType === "AMOUNT") {
      discountAmount = promo.discountValue;
    } else if (promo.discountType === "PERCENTAGE") {
      discountAmount = Math.round((subtotal * promo.discountValue) / 100);
    }
    setAppliedPromo({ code: promo.code, discountAmount, ...promo });
  };

  // Handle promo remove callback from modal
  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Fetch addresses when address modal opens
  const handleOpenAddressModal = async () => {
    setAddressModalOpen(true);
    setAddressLoading(true);
    try {
      const res = await fetchAllUserAddress();
      setAddresses(res?.data?.data || []);
    } catch (err) {
      toast.error("Failed to fetch addresses");
    } finally {
      setAddressLoading(false);
    }
  };

  // Handle order creation
  const handleCreateOrder = async () => {
    if (!selectedAddressId) return;
    setOrderLoading(true);
    try {
      const payload = {
        address: { id: selectedAddressId },
        appliedCouponCode: appliedPromo?.code || undefined,
        payableAmount: totalPayable,
      };
      const createdRes = await createOrder(payload);
      console.log(createdRes)
      setCreatedOrder(createdRes?.data?.data); // store order data
      toast.success("Order created! Proceed to payment.");
      setAddressModalOpen(false);
      setPaymentModeModalOpen(true);
    } catch (err) {
      toast.error("Failed to create order");
    } finally {
      setOrderLoading(false);
    }
  };

  // Handle cancel order
  const handleCancelOrder = async () => {
    if (!createdOrder?.id) return;
    try {
      const res = await cancelOrder(createdOrder.id);
      console.log(res)
      toast.success("Order cancelled.");
    } catch (err) {
      toast.success("Order cancelled.");
    } finally {
      setPaymentModeModalOpen(false);
      setCreatedOrder(null);
      setSelectedPaymentMode(null);
    }
  };

  // Handle proceed to pay
  const handleProceedToPay = () => {
    if (!selectedPaymentMode) return;
    // Implement payment logic here
    // After payment, close modal and reset state
    setPaymentModeModalOpen(false);
    setCreatedOrder(null);
    setSelectedPaymentMode(null);
    toast.success("Proceeding to payment...");
  };

  return (
    <Box sx={{ bgcolor: "#f7f3f3", minHeight: "100vh" }}>
      {/* <Navbar /> */}
      <Grid container justifyContent="center" spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={8} lg={7}>
          <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Your Cart
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                There are{" "}
                <span style={{ color: "#e53935", fontWeight: 600 }}>
                  {cartItems.length}
                </span>{" "}
                products in your cart
              </Typography>
              <Divider />
              <List sx={{ width: "100%" }}>
                {cartItems.map((item, idx) => {
                  const product = item.product || {};
                  const brand = product.brand?.name || "";
                  const name = product.name || "Product";
                  const image =
                    product.photos?.[0]?.url ||
                    "https://via.placeholder.com/100x80?text=No+Image";
                  const price =
                    product.afterDiscountAmount || product.price || 0;
                  const original = product.originalPrice || product.price || 0;
                  const discount = getDiscountPercent(original, price);
                  return (
                    <motion.div
                      key={item.id || idx}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0px 4px 16px rgba(0,0,0,0.10)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ borderRadius: 12, marginBottom: 8 }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        sx={{
                          py: 3,
                          borderBottom:
                            idx !== cartItems.length - 1
                              ? "1px solid #eee"
                              : "none",
                          position: "relative",
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={image}
                            alt={name}
                            sx={{
                              width: 100,
                              height: 80,
                              mr: 2,
                              borderRadius: 2,
                            }}
                          />
                        </ListItemAvatar>
                        <Box sx={{ flex: 1, ml: 2 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#888",
                              fontWeight: 600,
                              letterSpacing: 1,
                            }}
                          >
                            {brand.toUpperCase()}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              maxWidth: 400,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Rating
                              value={item?.product?.rating || 4}
                              readOnly
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: "#444", fontWeight: 500 }}
                            >
                              {item?.product?.rating || 4}.0
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontWeight: 600, fontSize: 18 }}
                              >
                                ₹{price}
                              </Typography>
                              {original > price && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    textDecoration: "line-through",
                                    color: "#888",
                                    ml: 1,
                                  }}
                                >
                                  ₹{original}
                                </Typography>
                              )}
                              {discount && (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#e53935",
                                    fontWeight: 600,
                                    ml: 1,
                                  }}
                                >
                                  {discount}% OFF
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            ml: 2,
                            display: "flex",
                            alignItems: "center",
                            border: 1,
                            borderRadius: 2,
                            px: 2,
                            py: 0.5,
                            position: "absolute",
                            bottom: 20,
                            right: 8,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, "Decrement")
                            }
                            sx={{ color: "#000" }}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#000",
                              mx: 1,
                              minWidth: 24,
                              textAlign: "center",
                              fontWeight: 700,
                            }}
                          >
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleQuantityChange(item.id, "Increment")
                            }
                            sx={{ color: "#000" }}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <IconButton
                          onClick={() => handleRemove(item.id)}
                          sx={{ position: "absolute", top: 12, right: 8 }}
                        >
                          <CloseIcon sx={{ color: "#444" }} />
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
          <Card sx={{ borderRadius: 3, boxShadow: 2, minWidth: 280, mb: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => setPromoOpen(true)}
            >
              <div className="flex gap-2 items-center">
                <LocalOffer sx={{ rotate: "90deg", opacity: "90%" }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Apply Promo Code
                </Typography>
              </div>
              {/* Show Remove button if promo applied, else ArrowForwardIos */}
              {appliedPromo ? (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={handleRemovePromo}
                  sx={{ minWidth: 80, ml: 2 }}
                >
                  Remove
                </Button>
              ) : (
                <ArrowForwardIos />
              )}
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 2, minWidth: 280 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Cart Totals
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#e53935" }}
                >
                  ₹
                  {subtotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  ₹{delivery}
                </Typography>
              </Box>
              {appliedPromo && (
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
                >
                  <Typography variant="body1">PromoCode Amount</Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: "#43a047" }}
                  >
                    -₹{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#e53935" }}
                >
                  ₹
                  {totalPayable.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "#ff5a5f",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 2,
                  py: 1.2,
                  mt: 1,
                  "&:hover": { background: "#e53935" },
                  boxShadow: "0px 2px 8px rgba(229,57,53,0.08)",
                }}
                startIcon={
                  <span role="img" aria-label="bag">
                    🛍️
                  </span>
                }
                onClick={handleOpenAddressModal}
              >
                CHECKOUT
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <PromoCodeModal
        open={promoOpen}
        onClose={() => setPromoOpen(false)}
        subtotal={subtotal}
        sku={cartItems.length === 1 ? cartItems[0]?.product?.sku : undefined}
        totalItem={cartItems?.length}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />
      {/* Address Selection Modal */}
      <Modal open={addressModalOpen} onClose={() => setAddressModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Select Delivery Address
          </Typography>
          {addressLoading ? (
            <Typography>Loading addresses...</Typography>
          ) : addresses.length === 0 ? (
            <Typography>No addresses found. Please add one in your profile.</Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}>
              {addresses.map((addr) => (
                <Box
                  key={addr.id}
                  onClick={() => setSelectedAddressId(addr.id)}
                  sx={{
                    border: selectedAddressId === addr.id ? "2px solid #ff5a5f" : "1px solid #ccc",
                    borderRadius: 2,
                    p: 2,
                    cursor: "pointer",
                    background: selectedAddressId === addr.id ? "#fff3f2" : "#fafafa",
                    transition: "border 0.2s, background 0.2s",
                  }}
                >
                  <Typography sx={{ fontWeight: 400 }}>{addr.addressLine}</Typography>
                  <Typography variant="body2">{addr.addressLine1} {addr.addressLine2}</Typography>
                  <Typography variant="body2">{addr.city} {addr.state} - {addr.zipCode}</Typography>
                  <Typography variant="body2">{addr.country}</Typography>
                  <Typography variant="body2">Phone: {user.phone}</Typography>
                  <Typography variant="body2">Address Type: {addr.addressType}</Typography>
                </Box>
              ))}
            </Box>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!selectedAddressId || orderLoading}
            onClick={handleCreateOrder}
            sx={{ mt: 2, fontWeight: 700 }}
          >
            {orderLoading ? "Placing Order..." : "Go to Payment Mode"}
          </Button>
        </Box>
      </Modal>
      {/* Payment Mode Modal */}
      <Modal open={paymentModeModalOpen} onClose={() => {}} disableEscapeKeyDown disableBackdropClick>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Select Payment Mode
          </Typography>
          <Button
            variant={selectedPaymentMode === "WALLET" ? "contained" : "outlined"}
            color="primary"
            fullWidth
            sx={{ mb: 2, fontWeight: 700 }}
            onClick={() => setSelectedPaymentMode("WALLET")}
          >
            Pay by Wallet
          </Button>
          <Button
            variant={selectedPaymentMode === "RAZORPAY" ? "contained" : "outlined"}
            color="secondary"
            fullWidth
            sx={{ fontWeight: 700, mb: 2 }}
            onClick={() => setSelectedPaymentMode("RAZORPAY")}
          >
            Pay by Razorpay
          </Button>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={handleCancelOrder}
              sx={{ fontWeight: 700 }}
            >
              Cancel Order
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              disabled={!selectedPaymentMode}
              onClick={handleProceedToPay}
              sx={{ fontWeight: 700 }}
            >
              Proceed to Pay
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartItem;
