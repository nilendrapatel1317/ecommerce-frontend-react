import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto mt-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h5" className="mb-4 text-center font-bold">
          User Settings
        </Typography>
        <Divider className="mb-4" />
        <List>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItem>
          <ListItem button onClick={() => navigate('/change-password')}>
            <ListItemIcon>
              <LockIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItem>
          <ListItem button onClick={() => navigate('/add-address')}>
            <ListItemIcon>
              <AddLocationAltIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Address" />
          </ListItem>
          <ListItem button onClick={() => navigate('/manage-address')}>
            <ListItemIcon>
              <HomeWorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Manage Address" />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
} 