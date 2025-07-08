import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, DUMMY_IMAGE }) => (
  <Grid container spacing={3} sx={{ width: "100%", margin: 0 , marginBottom:5  }}>
    {products.length === 0 ? (
      <Grid item xs={12}>
        <Typography variant="h6" align="center" color="text.secondary">
          No products found.
        </Typography>
      </Grid>
    ) : (
      products.map((product) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={product.id}
          zeroMinWidth
        >
          <ProductCard
            product={product}
            DUMMY_IMAGE={DUMMY_IMAGE}
          />
        </Grid>
      ))
    )}
  </Grid>
);

export default ProductGrid;