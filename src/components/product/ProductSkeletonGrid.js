import React from "react";
import { Grid, Paper } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const PAGE_SIZE = 12;

const ProductSkeletonGrid = () => (
  <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
    {Array.from({ length: PAGE_SIZE }).map((_, idx) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Skeleton variant="rectangular" width="100%" height={180} />
          <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rectangular" width="60%" height={36} sx={{ mt: 2 }} />
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default ProductSkeletonGrid; 