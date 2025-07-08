import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LoginPrompt = ({ open, onClose, onLogin, action = "add items to cart" }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Box display="flex" alignItems="center" gap={1}>
          <ShoppingCartIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Login Required
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 1 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          You need to be logged in to {action}.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please log in to your account to continue shopping and manage your cart.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Continue Browsing
        </Button>
        <Button 
          onClick={onLogin} 
          variant="contained"
          startIcon={<LoginIcon />}
          sx={{ borderRadius: 2 }}
        >
          Login Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginPrompt; 