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

export const sidebarNavigationData = [
  { id: 1, to: "/admin/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
  { id: 2, to: "/admin/orders", icon: <LocalGroceryStoreIcon />, label: "Orders" },
  { id: 3, to: "/admin/category", icon: <CategoryIcon />, label: "Category" },
  { id: 4, to: "/admin/users", icon: <PeopleIcon />, label: "Customers" },
  { id: 5, to: "/admin/brand", icon: <AddIcon />, label: "Brands" },
  { id: 6, to: "/admin/keywords", icon: <AddIcon />, label: "Keywords" },
  { id: 7, to: "/admin/hsn", icon: <AddIcon />, label: "HSN Code" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: { width: "16%", minWidth: "200px" },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold">ADMIN</Typography>
        <Box
          component="img"
          src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
          alt="admin logo"
          sx={{
            width: "9rem",
            height: "9rem",
            borderRadius: "50%",
            m: "10px auto",
            display: "block"
          }}
        />
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
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
