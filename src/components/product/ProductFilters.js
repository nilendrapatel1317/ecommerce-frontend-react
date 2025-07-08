import React from "react";
import {
  Paper,
  Typography,
  Divider,
  Slider,
  Box,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProductFilters = ({
  grandCategories,
  selectedGrandCategory,
  setSelectedGrandCategory,
  availableParentCategories,
  selectedParentCategory,
  setSelectedParentCategory,
  availableChildCategories,
  selectedChildCategory,
  setSelectedChildCategory,
  availableBrands,
  selectedBrand,
  setSelectedBrand,
  price,
  setPrice,
  selectedRating,
  setSelectedRating,
}) => (
  <Paper sx={{ width: 300, p: 3, mr: 3 , height: "fit-content", flexShrink: 0 }}>
    <Typography variant="h6" gutterBottom>
      Grand Categories
    </Typography>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ pl: 2, mb: 1, display: "block" }}
    >
      Select a grand category to see parent categories
    </Typography>
    <List>
      {grandCategories.map((grandCat) => (
        <ListItem key={grandCat.id} disablePadding>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedGrandCategory === grandCat.id}
                onChange={() =>
                  setSelectedGrandCategory(
                    selectedGrandCategory === grandCat.id ? null : grandCat.id
                  )
                }
              />
            }
            label={grandCat.name}
          />
        </ListItem>
      ))}
    </List>
    {/* Show parent categories if a grand category is selected */}
    {selectedGrandCategory && availableParentCategories.length > 0 && (
      <>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2" gutterBottom>
          Parent Categories
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pl: 2, mb: 1, display: "block" }}
        >
          Select a parent category to see child categories
        </Typography>
        <List>
          {availableParentCategories.map((parentCat) => (
            <ListItem key={parentCat.id} disablePadding sx={{ pl: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedParentCategory === parentCat.id}
                    onChange={() =>
                      setSelectedParentCategory(
                        selectedParentCategory === parentCat.id ? null : parentCat.id
                      )
                    }
                  />
                }
                label={parentCat.name}
              />
            </ListItem>
          ))}
        </List>
      </>
    )}
    {/* Show child categories if a parent category is selected */}
    {selectedParentCategory && availableChildCategories.length > 0 && (
      <>
        <Divider sx={{ my: 1 }} />
        <Typography variant="subtitle2" gutterBottom>
          Child Categories
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pl: 2, mb: 1, display: "block" }}
        >
          Select a child category to see brands
        </Typography>
        <List>
          {availableChildCategories.map((childCat) => (
            <ListItem key={childCat.id} disablePadding sx={{ pl: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedChildCategory === childCat.id}
                    onChange={() =>
                      setSelectedChildCategory(
                        selectedChildCategory === childCat.id ? null : childCat.id
                      )
                    }
                  />
                }
                label={childCat.name}
              />
            </ListItem>
          ))}
        </List>
      </>
    )}
    <Divider sx={{ my: 2 }} />
    {/* Show brands only when a child category is selected */}
    {selectedChildCategory && (
      <>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Brands
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ pl: 2, mb: 1, display: "block" }}
        >
          Select a brand to filter products
        </Typography>
        <List>
          {availableBrands.length > 0 ? (
            availableBrands.map((brand) => (
              <ListItem key={brand.id} disablePadding sx={{ pl: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBrand === brand.id}
                      onChange={() =>
                        setSelectedBrand(
                          selectedBrand === brand.id ? null : brand.id
                        )
                      }
                    />
                  }
                  label={brand.name}
                />
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ pl: 3 }}
            >
              No brands available for this category
            </Typography>
          )}
        </List>
      </>
    )}
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle1">Filter By Price</Typography>
    <Slider
      value={price}
      onChange={(_, v) => setPrice(v)}
      valueLabelDisplay="auto"
      min={0}
      max={10000}
      sx={{ mt: 2, mb: 1 }}
    />
    <Box display="flex" justifyContent="space-between">
      <Typography variant="body2">
        From: <b>₹{price[0]}</b>
      </Typography>
      <Typography variant="body2">
        To: <b>₹{price[1]}</b>
      </Typography>
    </Box>
    <Divider sx={{ my: 2 }} />
    <Typography variant="subtitle1">Filter By Rating</Typography>
    <List>
      {[5, 4, 3, 2, 1].map((rating) => (
        <ListItem key={rating} disablePadding>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedRating === rating}
                onChange={() =>
                  setSelectedRating(
                    selectedRating === rating ? null : rating
                  )
                }
              />
            }
            label={
              <Box display="flex" alignItems="center">
                {[...Array(rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    sx={{ color: "#fbc02d" }}
                    fontSize="small"
                  />
                ))}
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default ProductFilters; 