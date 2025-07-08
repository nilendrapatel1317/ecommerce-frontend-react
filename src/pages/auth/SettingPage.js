import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const SettingPage = () => {
  const navigate = useNavigate();
  const dummyImg = "/dummy-image.png";

  return (
    <Box>
      <List>
        <ListItem
          button
          onClick={() => navigate("/profile")}
          sx={{
            borderRadius: 2,
            mb: 1,
            "&:hover": { boxShadow: 2 },
            transition: "all 0.2s",
          }}
        >
          <ListItemIcon>
            <PersonIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 600 }}>Update Profile</Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={() => navigate("/change-password")}
          sx={{
            borderRadius: 2,
            mb: 1,
            "&:hover": { boxShadow: 2 },
            transition: "all 0.2s",
          }}
        >
          <ListItemIcon>
            <LockIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography sx={{ fontWeight: 600 }}>Change Password</Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default SettingPage;
