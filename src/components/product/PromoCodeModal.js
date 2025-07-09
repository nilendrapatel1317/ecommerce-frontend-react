import React, { useMemo, useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  CircularProgress,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CloseIcon from "@mui/icons-material/Close";
import { fetchAllPromoCode } from "../../services/PromoCodeService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 0,
  outline: "none",
  overflow: "auto",
};

const PromoCodeModal = ({ open, onClose, subtotal, sku, totalItem, appliedPromo, onApplyPromo, onRemovePromo }) => {
  const [search, setSearch] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [applyError, setApplyError] = useState(null);
  console.log(subtotal);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    fetchAllPromoCode()
      .then((res) => {
        console.log(res);
        setPromoCodes(res?.data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch promo codes");
        setLoading(false);
      });
  }, [open]);

  // Filter logic
  const { available, unavailable } = useMemo(() => {
    let available = [], unavailable = [];
    promoCodes.forEach((promo) => {
      let isAvailable = false;
      let reason = "";
      // If more than one item, product-based promos are not available
      if (totalItem > 1) {
        if (promo.applicableSku) {
          // Product-based promo, not available for multi-product cart
          reason = "Not valid for multi-product cart.";
          unavailable.push({ ...promo, reason });
          return;
        } else {
          // Cart-wide promo, check minOrderAmount
          if (promo.minOrderAmount && subtotal >= promo.minOrderAmount) {
            isAvailable = true;
          } else if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
            reason = `Add items worth ₹${promo.minOrderAmount - subtotal} more to avail this offer.`;
          } else {
            reason = `Not eligible.`;
          }
        }
      } else {
        // totalItem === 1, allow product-based promos
        if (sku) {
          if (promo.applicableSku && promo.applicableSku === sku) {
            isAvailable = true;
          } else if (promo.minOrderAmount && subtotal >= promo.minOrderAmount) {
            isAvailable = true;
          } else {
            if (promo.applicableSku && promo.applicableSku !== sku) {
              reason = `Not valid for this product.`;
            } else if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
              reason = `Add items worth ₹${promo.minOrderAmount - subtotal} more to avail this offer.`;
            } else {
              reason = `Not eligible.`;
            }
          }
        } else {
          // Multiple products: only minOrderAmount based
          if (promo.minOrderAmount && subtotal >= promo.minOrderAmount) {
            isAvailable = true;
          } else if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
            reason = `Add items worth ₹${promo.minOrderAmount - subtotal} more to avail this offer.`;
          } else if (promo.applicableSku) {
            reason = `Not valid for your cart.`;
          } else {
            reason = `Not eligible.`;
          }
        }
      }
      if (isAvailable) {
        available.push(promo);
      } else {
        unavailable.push({ ...promo, reason });
      }
    });
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      available = available.filter(
        (p) =>
          p.code.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
      unavailable = unavailable.filter(
        (p) =>
          p.code.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s)
      );
    }
    return { available, unavailable };
  }, [promoCodes, subtotal, sku, search, totalItem]);

  // Apply promo code handler
  const handleApply = async (promo) => {
    setApplying(true);
    setApplyError(null);
    let payload = { code: promo.code };
    if (promo.applicableSku) {
      payload.productSkus = [sku];
    } else if (promo.minOrderAmount) {
      payload.orderAmount = subtotal;
    }
    try {
      const { applyPromoCode } = await import("../../services/PromoCodeService");
      const res = await applyPromoCode(payload);
      if (res?.data?.status === 200) {
        onApplyPromo && onApplyPromo(res.data.data, promo); // pass promo details up
        setSelectedPromo(promo);
        setApplying(false);
        onClose();
      } else {
        setApplyError(res?.data?.message || "Failed to apply promo code");
        setApplying(false);
      }
    } catch (err) {
      setApplyError(err?.response?.data?.message || "Failed to apply promo code");
      setApplying(false);
    }
  };

  // Remove promo code handler
  const handleRemove = async () => {
    setApplying(true);
    setApplyError(null);
    try {
      const { removePromoCode } = await import("../../services/PromoCodeService");
      const res = await removePromoCode({ code: appliedPromo?.code });
      if (res?.data?.status === 200) {
        onRemovePromo && onRemovePromo();
        setSelectedPromo(null);
        setApplying(false);
        onClose();
      } else {
        setApplyError(res?.data?.message || "Failed to remove promo code");
        setApplying(false);
      }
    } catch (err) {
      setApplyError(err?.response?.data?.message || "Failed to remove promo code");
      setApplying(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: "flex", alignItems: "center", p: 2, pb: 0 }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flex: 1, textAlign: "center", fontWeight: 700 }}
          >
            Apply Coupon
          </Typography>
        </Box>
        <Box sx={{ p: 2, pt: 0 }}>
          <TextField
            fullWidth
            placeholder="Enter Coupon Code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalOfferIcon />
                </InputAdornment>
              ),
            }}
          />
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
              {error}
            </Typography>
          ) : (
            <>
              {/* Cart Bill Section */}
              <Box sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 2, background: '#fafafa' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>Cart Bill</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography>Delivery</Typography>
                  <Typography>₹40</Typography>
                </Box>
                {appliedPromo && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography>PromoCode Amount</Typography>
                    <Typography sx={{ color: '#43a047', fontWeight: 600 }}>-₹{appliedPromo.discountAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || 0}</Typography>
                  </Box>
                )}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontWeight: 700 }}>To Pay (total)</Typography>
                  <Typography sx={{ fontWeight: 700, color: '#e53935' }}>
                    ₹{(subtotal + 40 - (appliedPromo?.discountAmount || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </Typography>
                </Box>
              </Box>
              {/* Show error if any */}
              {applyError && (
                <Typography color="error" sx={{ textAlign: "center", mb: 2 }}>{applyError}</Typography>
              )}
              <Typography
                variant="subtitle2"
                sx={{ mt: 2, mb: 1, color: "#888", fontWeight: 700 }}
              >
                AVAILABLE COUPONS
              </Typography>
              <Stack spacing={2} sx={{ mb: 3 }}>
                {available.length === 0 && (
                  <Typography color="text.secondary">
                    No available coupons.
                  </Typography>
                )}
                {available.map((promo, idx) => (
                  <Card
                    key={promo.code}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 1,
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocalOfferIcon sx={{ color: "#ff9800", mr: 1 }} />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700 }}
                        >
                          {promo.code}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {promo.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {promo.applicableSku
                          ? `Product-based (SKU: ${promo.applicableSku})`
                          : promo.minOrderAmount
                          ? `Min Order: ₹${promo.minOrderAmount}`
                          : ""}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={applying}
                        onClick={() => handleApply(promo)}
                      >
                        Apply
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
              <Typography
                variant="subtitle2"
                sx={{ mt: 2, mb: 1, color: "#888", fontWeight: 700 }}
              >
                UNAVAILABLE COUPONS
              </Typography>
              <Stack spacing={2}>
                {unavailable.length === 0 && (
                  <Typography color="text.secondary">
                    No unavailable coupons.
                  </Typography>
                )}
                {unavailable.map((promo, idx) => (
                  <Card
                    key={promo.code}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 0,
                      border: "1px solid #eee",
                      opacity: 0.7,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <LocalOfferIcon sx={{ color: "#bdbdbd", mr: 1 }} />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: "#aaa" }}
                        >
                          {promo.code}
                        </Typography>
                        <Button
                          variant="text"
                          color="inherit"
                          disabled
                          sx={{ ml: "auto", fontWeight: 700 }}
                        >
                          APPLY
                        </Button>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, color: "#aaa" }}
                      >
                        {promo.description}
                      </Typography>
                      <Typography variant="caption" color="error.main">
                        {promo.reason}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              {/* If promo is already applied, show remove button */}
              {appliedPromo && (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleRemove}
                    disabled={applying}
                  >
                    Remove Promo Code
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default PromoCodeModal;
