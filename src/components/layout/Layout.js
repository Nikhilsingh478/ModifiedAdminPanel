import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Box } from "@mui/material";
import AppLogout from "../../AppLogout";

const Layout = ({ children }) => {
  return (
    <AppLogout>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, ml: "16%", width: "84%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Topbar />
          <Box className="layout-content" sx={{ p: 2, flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </AppLogout>
  );
};

export default Layout;
