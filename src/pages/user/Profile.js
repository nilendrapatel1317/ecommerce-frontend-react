import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return (
      <div className="container mx-auto mt-8 max-w-md">
        <Card>
          <CardContent>
            <Typography variant="h6" align="center">
              No user data found.
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            User Profile
          </Typography>
          <Divider className="mb-4" />
          <Box component="dl" sx={{ px: 2 }}>
            {Object.entries(user).map(([key, value]) => (
              <React.Fragment key={key}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  component="dt"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="body1" component="dd" sx={{ mb: 2 }}>
                  {typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value)}
                </Typography>
              </React.Fragment>
            ))}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
