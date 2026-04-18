import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        PaperProps={{
          sx: { width: "50%" },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ marginTop: "10px" }}>
          <ListItemButton
            to="/register"
            component={Link}
            onClick={() => setOpenDrawer(false)}
          >
            <ListItemIcon>sdgfr</ListItemIcon>
            <ListItemText>Register</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>

      <IconButton
        sx={{ color: "black" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
