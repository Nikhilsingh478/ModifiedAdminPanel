import React, { useState, useContext } from "react";
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
  useTheme,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { ColorModeContext } from "../../ThemeContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'light' ? "#ffffff" : "#171717",
  border: `1px solid ${theme.palette.mode === 'light' ? '#e2e8f0' : '#262626'}`,
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

const Topbar = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
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
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        borderBottom: 1,
        borderColor: "divider",
        zIndex: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: 2, 
            display: { md: "none" },
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'action.hover'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 0, display: { xs: "none", sm: "block" }, px: 2 }}
        >
          <Link to="/admin/dashboard">
            <Box
              component="img"
              sx={{ 
                height: 40,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              alt="Logo"
              src="/images/logo.svg"
            />
          </Link>
        </Typography>

        <Search sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={{ pl: 1, display: "flex", alignItems: "center" }}>
            <SearchIcon style={{ opacity: 0.5 }} />
          </Box>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
          sx={{ 
            ml: 1, 
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'action.hover'
            }
          }} 
          onClick={colorMode.toggleColorMode} 
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

          <IconButton 
          color="inherit"
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: 'action.hover'
            }
          }}
        >
          <Badge badgeContent={0} color="error">
            <NotificationsIcon style={{ color: theme.palette.mode === 'light' ? "#64748b" : "#a3a3a3" }} />
          </Badge>
        </IconButton>

          <IconButton 
            onClick={handleMenu} 
            color="inherit" 
            sx={{ 
              p: 0.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'action.hover'
              }
            }}
          >
            <Avatar 
              src="/images/cropped_circle_image.webp" 
              sx={{ 
                width: 36, 
                height: 36, 
                border: `2px solid ${theme.palette.primary.main}`,
                transition: 'all 0.2s ease'
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
