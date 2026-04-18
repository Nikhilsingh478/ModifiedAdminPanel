import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";

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

  const drawerContent = (
    <>
      <Box sx={{ p: 3, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
          sx={{ width: 72, height: 72, mb: 1.5, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
        />
        <Typography variant="h6" fontWeight="bold">Admin User</Typography>
        <Typography variant="body2" color="textSecondary">superadmin@profee.com</Typography>
      </Box>
      <Divider />
      <List sx={{ mt: 1 }}>
        {sidebarNavigationData.map((item) => (
          <ListItemButton
            key={item.id}
            component={Link}
            to={item.to}
            selected={location.pathname.startsWith(item.to)}
            sx={{
              margin: '4px 12px',
              borderRadius: '8px',
              padding: '10px 16px',
              "&.Mui-selected": {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3b82f6",
                fontWeight: 600,
                "& .MuiListItemIcon-root": {
                  color: "#3b82f6",
                }
              },
              "&:hover": {
                backgroundColor: "rgba(59, 130, 246, 0.05)",
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: "40px", color: location.pathname.startsWith(item.to) ? "#3b82f6" : "#64748b" }}>{item.icon}</ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: location.pathname.startsWith(item.to) ? 600 : 500 }} primary={item.label} />
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
