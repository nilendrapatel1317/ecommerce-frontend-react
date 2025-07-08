import React from "react";
import { Box, Typography, Button, Divider, Paper, Grid, Chip, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AddressList = ({ user }) => {
  const addresses = user?.addresses || [];
  console.log(user)
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Address</Typography>
        <Button sx={{ bgcolor: '#e3f3ff', color: '#1976d2', fontWeight: 600, borderRadius: 2, px: 3, '&:hover': { bgcolor: '#cbe7ff' } }}>
          Add Address
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {addresses.map((addr, idx) => (
        <Paper key={addr.id || idx} sx={{ p: 2, mb: 2, border: '1px dashed #ddd', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Chip label={addr.addressType?.charAt(0).toUpperCase() + addr.addressType?.slice(1).toLowerCase()} size="small" sx={{ mb: 1, bgcolor: '#eee' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'inline-block', mr: 2 }}>{user?.fullName || user?.username}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, display: 'inline-block', mr: 2 }}>{user?.phone ? `+91${user.phone}` : ''}</Typography>
            <Typography variant="body2" sx={{ color: '#444', mt: 0.5 }}>{addr.addressLine} {addr.city} {addr.state} {addr.country} {addr.zipCode}</Typography>
          </Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Paper>
      ))}
    </Box>
  );
};

export default AddressList; 