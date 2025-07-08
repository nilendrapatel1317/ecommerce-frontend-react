import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import WorkIcon from "@mui/icons-material/Work";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CakeIcon from "@mui/icons-material/Cake";

const ProfileDetails = ({ user }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        My Details
      </Typography>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Details column */}
        <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {user?.username}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {user?.phone}
                </Typography>
              </Box>
              {user?.gender && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Gender
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {user?.gender}
                  </Typography>
                </Box>
              )}
              {user?.occupation && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Occupation
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {user?.occupation}
                  </Typography>
                </Box>
              )}
              {user?.maritalStatus && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Marital Status
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {user?.maritalStatus}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {user?.wallet && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Wallet Amount
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#388e3c" }}
                  >
                    ₹{user?.wallet.balance}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
