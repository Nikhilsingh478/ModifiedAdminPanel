import React, { useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import Navbar from "./header/Navbar";
import UserCarousels from "./user/components/UserCarousels";
import BottomNavbar from "./user/components/BottomNavbar";
import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ProductsScreen from "./user/components/ProductsScreen";
import Footer from "./Footer";


const Home = () => {
  

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
    } else {
      window.location.href = "/login";
    }
  }, []);

  //material UI breakpoints
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <div className="">
        <div>
          <Navbar />
        </div>
      </div>

      <UserCarousels />
      <hr />
      {isMatch ? (
        <>
          <BottomNavbar />
        </>
      ) : null}
        

        <ProductsScreen  />
        <Footer/>
      

         </>
  );
};

export default Home;
