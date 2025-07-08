import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper, Alert } from '@mui/material';
import { isLoggedIn, getCurrentUser } from '../../utils/auth';
import { checkCartAccess } from '../../services/CartItemService';

const AuthTest = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [cartAccess, setCartAccess] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    const loggedIn = isLoggedIn();
    const user = getCurrentUser();
    setLoginStatus(loggedIn);
    setUserInfo(user);
  };

  const testCartAccess = async () => {
    try {
      const response = await checkCartAccess();
      setCartAccess('Success - User can access cart');
    } catch (error) {
      if (error.response?.status === 401) {
        setCartAccess('Failed - User not authenticated (401)');
      } else {
        setCartAccess(`Failed - ${error.message}`);
      }
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Authentication Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Current Status
        </Typography>
        
        <Alert severity={loginStatus ? "success" : "info"} sx={{ mb: 2 }}>
          {loginStatus ? "User is logged in" : "User is not logged in"}
        </Alert>

        {userInfo && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={600}>
              User Information:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Username: {userInfo.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {userInfo.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Roles: {userInfo.roles?.map(role => role.name).join(', ')}
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Cart Access Test
        </Typography>
        
        <Button 
          variant="contained" 
          onClick={testCartAccess}
          sx={{ mb: 2 }}
        >
          Test Cart Access
        </Button>

        {cartAccess && (
          <Alert severity={cartAccess.includes('Success') ? "success" : "error"}>
            {cartAccess}
          </Alert>
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Expected Behavior
        </Typography>
        
        <Typography variant="body2" paragraph>
          ✅ <strong>Product Browsing:</strong> Should work without login
        </Typography>
        
        <Typography variant="body2" paragraph>
          ❌ <strong>Add to Cart:</strong> Should show login prompt if not authenticated
        </Typography>
        
        <Typography variant="body2" paragraph>
          ❌ <strong>Remove from Cart:</strong> Should show login prompt if not authenticated
        </Typography>
        
        <Typography variant="body2" paragraph>
          ❌ <strong>View Cart:</strong> Should require authentication
        </Typography>
      </Paper>
    </Box>
  );
};

export default AuthTest; 