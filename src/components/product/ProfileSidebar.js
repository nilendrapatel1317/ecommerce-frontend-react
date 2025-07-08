import React from "react";
import { Card, CardContent, Typography, Divider, Box, Avatar, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

const SIDEBAR_OPTIONS = [
  { label: "My Profile", icon: <PersonIcon />, key: "profile" },
  { label: "Address", icon: <LocationOnIcon />, key: "address" },
  { label: "My WishList", icon: <FavoriteBorderIcon />, key: "wishlist" },
  { label: "My Orders", icon: <ShoppingBagIcon />, key: "orders" },
  { label: "Settings", icon: <SettingsIcon />, key: "settings" },
  { label: "Logout", icon: <LogoutIcon />, key: "logout" },
];

const dummyImg = "/dummy-image.png";

const ProfileSidebar = ({ user, selected, onSelect }) => (
  <Card sx={{ borderRadius: 3, boxShadow: 2, minWidth: 250 }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 0 }}>
      <Avatar src={dummyImg} sx={{ width: 100, height: 100, mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, textAlign: 'center' }}>
        {user?.fullName || user?.username || "JOJO"}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
        {user?.email || "jojo@gmail.com"}
      </Typography>
    </CardContent>
    <Divider />
    <List sx={{ py: 0 }}>
      {SIDEBAR_OPTIONS.map(opt => (
        <ListItem
          button
          key={opt.key}
          selected={selected === opt.key}
          onClick={() => onSelect(opt.key)}
          sx={{
            borderLeft: selected === opt.key ? '4px solid #ff5a5f' : '4px solid transparent',
            bgcolor: selected === opt.key ? '#f7f3f3' : 'transparent',
            fontWeight: selected === opt.key ? 700 : 500,
            color: selected === opt.key ? '#e53935' : '#222',
            py: 1.5,
          }}
        >
          <ListItemIcon sx={{ color: selected === opt.key ? '#e53935' : '#888' }}>{opt.icon}</ListItemIcon>
          <ListItemText primary={opt.label} />
        </ListItem>
      ))}
    </List>
  </Card>
);

export default ProfileSidebar; 