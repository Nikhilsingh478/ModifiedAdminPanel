import React, { useState } from "react";
import { history, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import DrawerComp from "./DrawerComp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const Navbar2 = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const param = useParams();
  const history = useHistory();

  //cart state
  const cartState = useSelector((state) => state.cartReducer);

  //user state
  const userState = useSelector((state) => state.LoginUserReducer);
  const { userInfo } = userState;

  // console.log(userInfo);

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/cart`);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
  // console.log(cartState.cartItems.length);
  return (
    <>
      {/* <p
        onClick={handleClick}
        style={{
          margin: "1rem",
          fontSize: "19px",
          border: "1px solid",
          width: "7rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        Cart {cartState.cartItems.length}
      </p> */}

      {/* <AppBar>
          <Toolbar>
            
              {
                isMatch ? (
                  <>
                    <DrawerComp />
                  </>
                ) : (
                  <>
                     Other Tabs 
                  </>
                )
               
                
              }
          
          </Toolbar>
      </AppBar> */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ bgcolor: "white" }}
          style={{
            boxShadow: "rgb(0 0 0 / 20%) 0px 8px 6px -6px",
          }}
        >
          <Toolbar>
              {
                isMatch ? (
                  <>
                    <DrawerComp/>
                  </>
                ) : null
              }

            <Typography
              onClick={() => history.push("/")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                color: "black",
              }}
            >
              RestoBaba
            </Typography>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={cartState.cartItems.length} color="error">
                <ShoppingCartIcon
                  onClick={handleClick}
                  sx={{ color: "black" }}
                />
              </Badge>
            </IconButton>

            {userInfo ? (
              <>
                <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => setShow(!show)}
                    >
                      <PersonIcon
                        style={{
                          color: "red",
                          background: "white",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      {/* <Avatar/> */}
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={show}
                      onClose={() => setShow(false)}
                      onClick={() => setShow(false)}
                    >
                      <MenuItem component={Link} to="/orders">
                        Orders
                      </MenuItem>
                      <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                    </Menu>
                  </div>
                </Box>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => history.push("/login")}
                  sx={{ color: "black" }}
                >
                  Login
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar2;
