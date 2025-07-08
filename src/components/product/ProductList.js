import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Pagination, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import ProductSkeletonGrid from "./ProductSkeletonGrid";
import { fetchProducts } from "../../services/ProductService";
import { fetchAllGrandCategories } from "../../services/GrandCategoryService";

const PAGE_SIZE = 12;
const DUMMY_IMAGE = "/dummy-image.png";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // Filter states
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");
  const [price, setPrice] = useState([0, 10000]);
  const [grandCategories, setGrandCategories] = useState([]);
  const [selectedGrandCategory, setSelectedGrandCategory] = useState(null);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);
  const [availableParentCategories, setAvailableParentCategories] = useState([]);
  const [availableChildCategories, setAvailableChildCategories] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  // Fetch grand categories on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAllGrandCategories();
      setGrandCategories(res?.data?.data || []);
    };
    fetchData();
  }, []);

  // Update available parent categories when grand category changes
  useEffect(() => {
    if (!selectedGrandCategory) {
      setAvailableParentCategories([]);
      setAvailableChildCategories([]);
      setAvailableBrands([]);
      setSelectedParentCategory(null);
      setSelectedChildCategory(null);
      setSelectedBrand(null);
      return;
    }
    const grandCat = grandCategories.find((g) => g.id === selectedGrandCategory);
    if (!grandCat) return;
    setAvailableParentCategories(grandCat.parentCategories || []);
    setSelectedParentCategory(null);
    setSelectedChildCategory(null);
    setSelectedBrand(null);
  }, [selectedGrandCategory, grandCategories]);

  // Update available child categories when parent category changes
  useEffect(() => {
    if (!selectedParentCategory) {
      setAvailableChildCategories([]);
      setAvailableBrands([]);
      setSelectedChildCategory(null);
      setSelectedBrand(null);
      return;
    }
    const parentCat = availableParentCategories.find((p) => p.id === selectedParentCategory);
    if (!parentCat) return;
    setAvailableChildCategories(parentCat.childCategories || []);
    setSelectedChildCategory(null);
    setSelectedBrand(null);
  }, [selectedParentCategory, availableParentCategories]);

  // Update available brands when child category changes
  useEffect(() => {
    if (!selectedChildCategory) {
      setAvailableBrands([]);
      setSelectedBrand(null);
      return;
    }
    const childCat = availableChildCategories.find((c) => c.id === selectedChildCategory);
    if (!childCat) return;
    setAvailableBrands(childCat.brands || []);
    setSelectedBrand(null);
  }, [selectedChildCategory, availableChildCategories]);

  const fetchProductsList = async () => {
    setLoading(true);
    const start = Date.now();
    try {
      const params = {
        page,
        size: PAGE_SIZE,
        sort,
        search,
        priceMin: price[0],
        priceMax: price[1],
      };
      if (selectedGrandCategory) params.grandCategoryId = selectedGrandCategory;
      if (selectedParentCategory) params.parentCategoryId = selectedParentCategory;
      if (selectedChildCategory) params.childCategoryId = selectedChildCategory;
      if (selectedBrand) params.brandId = selectedBrand;
      if (selectedRating) params.rating = selectedRating;
      const res = await fetchProducts(params);
      console.log('Product API response:', res.data);
      setProducts(res.data.data.data || []);
      console.log('Products array:', res.data.data.data || []);
      setTotal(res.data.data.total || 0);
    } catch (e) {
      console.error("Error fetching products:", e);
      setProducts([]);
      setTotal(0);
    }
    // Ensure skeleton shows for at least 1 second
    const elapsed = Date.now() - start;
    const minDelay = 1000; // 1 second
    if (elapsed < minDelay) {
      setTimeout(() => setLoading(false), minDelay - elapsed);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList();
    // eslint-disable-next-line
  }, [
    page,
    sort,
    search,
    price,
    selectedGrandCategory,
    selectedParentCategory,
    selectedChildCategory,
    selectedBrand,
    selectedRating,
  ]);

  return (
    <Box sx={{ display: "flex", my: 4, justifyContent: "center" }}>
      {/* Sidebar Filters */}
      <ProductFilters
        grandCategories={grandCategories}
        selectedGrandCategory={selectedGrandCategory}
        setSelectedGrandCategory={setSelectedGrandCategory}
        availableParentCategories={availableParentCategories}
        selectedParentCategory={selectedParentCategory}
        setSelectedParentCategory={setSelectedParentCategory}
        availableChildCategories={availableChildCategories}
        selectedChildCategory={selectedChildCategory}
        setSelectedChildCategory={setSelectedChildCategory}
        availableBrands={availableBrands}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        price={price}
        setPrice={setPrice}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      {/* Main Content */}
      <Box flex={1} maxWidth="lg" mx="auto">
        {/* Top Bar: Search & Sort */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <TextField
            label="Search for products..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 320 }}
          />
          <Box display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(total / PAGE_SIZE)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="name_asc">Name, A to Z</MenuItem>
              <MenuItem value="name_desc">Name, Z to A</MenuItem>
              <MenuItem value="price_asc">Price, Low to High</MenuItem>
              <MenuItem value="price_desc">Price, High to Low</MenuItem>
              <MenuItem value="created_at_desc">Newest</MenuItem>
              <MenuItem value="created_at_asc">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          There are {total} products.
        </Typography>
        {loading ? (
          <ProductSkeletonGrid />
        ) : (
          <>
            {products.length === 0 && (
              <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
                No products found. Check your backend, filters, or API response.
              </Typography>
            )}
            <ProductGrid
              products={products}
              DUMMY_IMAGE={DUMMY_IMAGE}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductList; 