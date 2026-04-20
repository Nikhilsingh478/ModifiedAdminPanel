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
  backgroundColor: '#1B1F26',
  border: '1px solid #2A2F3A',
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
    borderColor: '#A7F3D0',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#E5E7EB',
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
      color: '#9CA3AF',
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
        bgcolor: '#15181D',
        color: '#E5E7EB',
        borderBottom: '1px solid #2A2F3A',
        zIndex: 1100,
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
              p: 0.5,
            }}
          >
            <Avatar 
              src="/images/cropped_circle_image.webp" 
              sx={{ 
                width: 32, 
                height: 32, 
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
                background: 'rgba(27, 31, 38, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid #2A2F3A',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                  backgroundColor: 'rgba(167, 243, 208, 0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: '#E5E7EB' }}>Profile</Typography>
            </MenuItem>
            <MenuItem 
              onClick={logoutHandler}
              sx={{
                borderRadius: '12px',
                mx: 1,
                my: 0.5,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(252, 165, 165, 0.1)',
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: '#FCA5A5' }}>LogOut</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
