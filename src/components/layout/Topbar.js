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
  borderRadius: '6px',
  backgroundColor: theme.palette.mode === "light" ? "#FFFFFF" : "#1B1F26",
  border: `1px solid ${theme.palette.divider}`,
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  display: "flex",
  alignItems: "center",
  transition: 'all 0.2s ease',
  '&:focus-within': {
    borderColor: theme.palette.mode === "light" ? "#10B981" : "#A7F3D0",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1.2, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1.5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: '0.9rem',
    [theme.breakpoints.up("md")]: {
      width: "24ch",
    },
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
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
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 58, sm: 64 }, px: { xs: 1, sm: 2 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            mr: { xs: 0.5, sm: 2 }, 
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
          sx={{ flexGrow: 0, display: { xs: "none", sm: "block" }, px: { sm: 1, md: 2 } }}
        >
          <Link to="/admin/dashboard">
            <Box
              component="img"
              sx={{ 
                height: { sm: 34, md: 40 },
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

        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.4, sm: 1.25, md: 2 } }}>
          <IconButton 
            onClick={colorMode.toggleColorMode} 
            color="inherit"
            sx={{ 
              ml: 1, 
            }} 
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton 
            color="inherit"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            <Badge 
              badgeContent={0} 
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton 
            onClick={handleMenu} 
            color="inherit" 
            sx={{ 
              p: { xs: 0.25, sm: 0.5 },
            }}
          >
            <Avatar 
              src="/images/cropped_circle_image.webp" 
              sx={{ 
                width: { xs: 30, sm: 32 }, 
                height: { xs: 30, sm: 32 }, 
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
            PaperProps={{
              sx: {
                mt: 1.5,
                borderRadius: '16px',
                background: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.96)" : "rgba(27, 31, 38, 0.95)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === "light" ? "0 10px 26px rgba(15, 23, 42, 0.12)" : "0 8px 32px rgba(0, 0, 0, 0.4)",
                minWidth: 180,
                '& .MuiList-root': {
                  padding: '8px',
                },
              }
            }}
          >
            <MenuItem 
              onClick={handleClose}
              sx={{
                borderRadius: '12px',
                mx: 1,
                my: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.mode === "light" ? "rgba(16, 185, 129, 0.08)" : "rgba(167, 243, 208, 0.1)",
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: "text.primary" }}>Profile</Typography>
            </MenuItem>
            <MenuItem 
              onClick={logoutHandler}
              sx={{
                borderRadius: '12px',
                mx: 1,
                my: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.mode === "light" ? "rgba(239, 68, 68, 0.08)" : "rgba(252, 165, 165, 0.1)",
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: theme.palette.mode === "light" ? "#DC2626" : "#FCA5A5" }}>LogOut</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
