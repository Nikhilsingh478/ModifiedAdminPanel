import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  keyframes,
  IconButton,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

// Animation definitions
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const sidebarNavigationData = [
  { id: 1, to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { id: 2, to: "/admin/orders", icon: <LocalGroceryStoreIcon />, label: "Orders" },
  { id: 3, to: "/admin/category", icon: <CategoryIcon />, label: "Category" },
  { id: 4, to: "/admin/users", icon: <PeopleIcon />, label: "Customers" },
  { id: 5, to: "/admin/brand", icon: <AddIcon />, label: "Brands" },
  { id: 6, to: "/admin/keywords", icon: <AddIcon />, label: "Keywords" },
  { id: 7, to: "/admin/hsn", icon: <AddIcon />, label: "HSN Code" },
];

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
  const location = useLocation();
  const [hasAnimated, setHasAnimated] = useState(() => {
    // Check if animations have already run in this session
    return sessionStorage.getItem('sidebarAnimated') === 'true';
  });

  useEffect(() => {
    // Only run animations once per session
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
        sessionStorage.setItem('sidebarAnimated', 'true');
      }, 2000); // Wait for animations to complete

      return () => clearTimeout(timer);
    }
  }, [hasAnimated]);

  const drawerContent = (
    <>
      {/* Mobile Close Button */}
      <Box sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        justifyContent: 'flex-end', 
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'rotate(90deg)',
              backgroundColor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ 
          p: 3, 
          textAlign: "center", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          // Only animate on initial load
          animation: !hasAnimated ? `${fadeInScale} 0.6s ease-out` : 'none',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, primary.main, transparent)',
            opacity: 0.3
          }
        }}>
        <Avatar 
          src="/images/cropped_circle_image.webp"
          sx={{ 
            width: 72, 
            height: 72, 
            mb: 1.5, 
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            border: '3px solid',
            borderColor: 'primary.main',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: 'linear-gradient(45deg, primary.main, secondary.main)',
              borderRadius: '50%',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              zIndex: -1,
            },
            '&:hover': {
              transform: 'scale(1.08) rotate(5deg)',
              borderColor: 'primary.dark',
              boxShadow: "0 12px 24px -1px rgb(0 0 0 / 0.25)",
              '&::before': {
                opacity: 0.3,
              }
            }
          }}
        />
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(45deg, primary.main, secondary.main)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // Only animate on initial load
            animation: !hasAnimated ? `${fadeInScale} 1s ease-out` : 'none',
            transition: 'all 0.3s ease',
            cursor: 'default',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          Admin
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{
            mt: 0.5,
            fontSize: '0.85rem',
            opacity: 0.8,
            // Only animate on initial load
            animation: !hasAnimated ? `${fadeInScale} 1.2s ease-out` : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Administrator
        </Typography>
      </Box>
      <Divider />
      <List sx={{ mt: 1 }}>
        {sidebarNavigationData.map((item) => (
          <ListItemButton
            key={item.id}
            component={Link}
            to={item.to}
            onClick={() => {
              // Close mobile drawer after navigation
              if (window.innerWidth < 900) {
                handleDrawerToggle();
              }
            }}
            selected={location.pathname.startsWith(item.to)}
            sx={{
              margin: '2px 8px',
              borderRadius: '4px',
              padding: '8px 12px',
              transition: 'all 0.2s ease',
              position: 'relative',
              "&.Mui-selected": {
                backgroundColor: 'rgba(167, 243, 208, 0.16)',
                color: '#A7F3D0',
                fontWeight: 500,
                "& .MuiListItemIcon-root": {
                  color: '#A7F3D0',
                },
              },
              "&:hover": {
                backgroundColor: 'rgba(167, 243, 208, 0.08)',
              }
            }}
          >
            <ListItemIcon 
              sx={{ 
                minWidth: "32px", 
                color: location.pathname.startsWith(item.to) ? '#A7F3D0' : '#4B5563',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primaryTypographyProps={{ 
                fontSize: '0.875rem', 
                fontWeight: location.pathname.startsWith(item.to) ? 500 : 400,
              }} 
              primary={item.label} 
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '84vw',
            maxWidth: 300,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
            background: 'background.paper',
            boxShadow: '4px 0 6px -1px rgb(0 0 0 / 0.1)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
