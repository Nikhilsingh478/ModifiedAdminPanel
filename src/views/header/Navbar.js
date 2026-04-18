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
  Backdrop,
  CircularProgress,
  makeStyles,
  CssBaseline,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import DrawerComp from "./DrawerComp";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f2f2f2",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const param = useParams();
  const history = useHistory();

  //cart state
  const cartState = useSelector((state) => state.cartReducer);

  //user state
  const userState = useSelector((state) => state.LoginUserReducer);
  const { userInfo } = userState;

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/cart`);
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Box>
        <AppBar
          component={"nav"}
          position="static"
          style={{
            backgroundColor: "white",
            boxShadow: "none",
            justifyContent: "center",
            // backgroundColor:"red"
          }}
        >
          <div>
            <Toolbar>
              {/* {
                isMatch ? (
                  <>
                    <DrawerComp />
                  </>
                ) : (
                  <>
                     Other Tabs 
                  </>
                )
               
                
              } */}
              <Typography
                // onClick={() => history.push("/")}
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, marginLeft: "8px" }}
                style={{
                  color: "black",
                }}
              >
                <Link onClick={() => history.push("/")}>
                  <Box
                    component="img"
                    sx={{ height: 54 }}
                    alt="Logo"
                    src="/images/logo.png"
                    style={{
                      height: "3rem",
                      width: "3rem",
                    }}
                  />
                </Link>
                RestoBaba
              </Typography>

              {/* search box */}

              {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Box> */}
              {/* end search box */}

              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge
                    badgeContent={cartState.cartItems.length}
                    color="error"
                  >
                    <ShoppingCartIcon
                      onClick={handleClick}
                      sx={{ color: "black" }}
                    />
                  </Badge>
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                        lg: "block",
                        color: "black",
                        fonstSize: "16px",
                        lineHeight: "14px",
                        marginLeft: "8px",
                      },
                    }}
                  >
                    Cart
                  </Typography>
                </IconButton>
              </Box>

              {userInfo ? (
                <>
                  {/* <Box sx={{ flexGrow: 0, marginLeft: "auto" }}> */}
                   <Box sx={{ display: { xs: "none", lg: "block" } }}>
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
                        <Typography
                          sx={{
                            display: {
                              xs: "none",
                              sm: "block",
                              color: "black",
                              fonstSize: "16px",
                              lineHeight: "14px",
                              marginLeft: "8px",
                            },
                          }}
                        >
                          Account
                        </Typography>
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
          </div>
        </AppBar>

        <hr
          style={{
            margin: "0px",
            padding: "0px",
          }}
        />
      </Box>
    </>
  );
};

export default Navbar;
