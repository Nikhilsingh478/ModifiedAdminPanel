import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Badge,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f2f2f2",
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Topbar = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logoutHandler = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "white",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.05)",
        zIndex: 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, display: { xs: "none", sm: "block" }, px: 2 }}
        >
          <Link to="/admin/dashboard">
            <Box
              component="img"
              sx={{ height: 40 }}
              alt="Logo"
              src="./images/logo.svg"
            />
          </Link>
        </Typography>

        <Search>
          <Box sx={{ pl: 1, display: "flex", alignItems: "center" }}>
            <SearchIcon style={{ color: "black", opacity: 0.5 }} />
          </Box>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
            style={{ color: "black" }}
            disabled
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
              <NotificationsIcon style={{ color: "#d1d1d1" }} />
            </Badge>
          </IconButton>

          <IconButton onClick={handleMenu} color="inherit">
            <PersonIcon
              style={{
                color: "red",
                background: "#f0f0f0",
                borderRadius: "50%",
                padding: "2px",
                width: "30px",
                height: "30px",
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
