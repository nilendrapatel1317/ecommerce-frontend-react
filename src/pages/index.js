import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import HomeSlider from "../components/HomeSlider";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 text-center"
      >
        {/* <HomeSlider /> */}
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Ecommerce Application
        </Typography>
        <Button variant="contained" color="primary">
          <Link to="/products" className="flex items-center">
            <span>Browse Products</span>
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
