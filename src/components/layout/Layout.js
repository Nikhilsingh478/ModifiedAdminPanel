import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import AppLogout from "../../AppLogout";

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppLogout>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
        </Box>
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` }, 
            display: "flex", 
            flexDirection: "column" 
          }}
        >
          <Topbar handleDrawerToggle={handleDrawerToggle} />
          
          <Box 
            className="layout-content" 
            sx={{ 
              p: { xs: 2, md: 4 }, 
              flexGrow: 1, 
              overflowX: "hidden",
              animation: 'fadeIn 0.3s ease-in'
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </AppLogout>
  );
};

export default Layout;
