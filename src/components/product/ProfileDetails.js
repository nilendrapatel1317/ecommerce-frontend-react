import React from "react";
import { Box, Typography, TextField, Button, Divider, Grid, Link } from "@mui/material";

const ProfileDetails = ({ user }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>My Profile</Typography>
        <Link href="#" sx={{ fontWeight: 600, color: '#1976d2', cursor: 'pointer' }}>CHANGE PASSWORD</Link>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Full Name"
            value={user?.fullName || user?.username || ''}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            value={user?.email || ''}
            fullWidth
            margin="normal"
            disabled
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box sx={{ width: 48, height: 48, border: '1px solid #eee', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1, bgcolor: '#fff' }}>
              <span role="img" aria-label="India">🇮🇳</span>
            </Box>
            <TextField
              label="Phone"
              value={user?.phone ? `+91${user.phone}` : ''}
              fullWidth
              margin="normal"
            />
          </Box>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{ mt: 3, background: '#ff5a5f', fontWeight: 700, borderRadius: 2, px: 4, py: 1.2, '&:hover': { background: '#e53935' } }}
      >
        UPDATE PROFILE
      </Button>
    </Box>
  );
};

export default ProfileDetails; 