import React, { useState } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { logout } from "../../../redux/actions/userAction";
import { useDispatch } from "react-redux";
import AppLogout from "../../../AppLogout";

const sidebarNavigationData = [
  {
    id: 1,
    to: "/admin/dashboard",
    icon: <DashboardIcon />,
    label: "Dashboard",
  },
  {
    id: 2,
    to: "/admin/orders",
    icon: <LocalGroceryStoreIcon />,
    label: "Orders",
  },

  {
    id: 3,
    to: "/admin/category",
    icon: <CategoryIcon />,
    label: "Category List",
  },

  {
    id: 4,
    to: "/admin/users",
    icon: <PeopleIcon />,
    label: "Customers List",
  },
  {
    id: 5,
    to: "/admin/brand",
    icon: <AddIcon />,
    label: "Add Brand",
  },

  {
    id: 6,
    to: "/admin/keywords",
    icon: <AddIcon />,
    label: "Add Keywords",
  },

  {
    id: 7,
    to: "/admin/hsn",
    icon: <AddIcon />,
    label: "Add HSN Code",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(true);
  const [show, setShow] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleClick = async (index) => {
    await setActiveItem(index);
  };

  return (
    <>
      <AppLogout>
        <Box>
          <AppBar
            component={"nav"}
            position="static"
            style={{
              backgroundColor: "white",
              boxShadow: "none",
              justifyContent: "center",
              zIndex: "1",
            }}
          >
            <div>
              <Toolbar>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, marginLeft: "8px" }}
                  style={{
                    color: "black",
                  }}
                >
                  <Link to="/admin/dashboard">
                    <Box
                      component="img"
                      sx={{ height: 54 }}
                      alt="Logo"
                      src="./images/logo.svg"
                      style={{
                        height: "40px",
                        width: "140px",
                        marginLeft: "16.5%",
                      }}
                    />
                  </Link>
                </Typography>

                <Box sx={{ display: { xs: "none", lg: "block" } }}>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      color="inherit"
                      onClick={() => setShow(!show)}
                    >
                      <PersonIcon
                        style={{
                          color: "red",
                          background: "white",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                      <Typography
                        sx={{
                          display: {
                            xs: "none",
                            sm: "block",
                            color: "black",
                            fonstSize: "16px",
                            lineHeight: "14px",
                            marginLeft: "8px",
                          },
                        }}
                      >
                        Account
                      </Typography>
                      {/* <Avatar/> */}
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={show}
                      onClose={() => setShow(false)}
                      onClick={() => setShow(false)}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem onClick={logoutHandler}>LogOut</MenuItem>
                    </Menu>
                  </div>
                </Box>
              </Toolbar>
            </div>
          </AppBar>

          <hr
            style={{
              margin: "0px",
              padding: "0px",
            }}
          />
        </Box>

        <Drawer
          variant="permanent"
          PaperProps={{
            sx: { width: "15%" },
          }}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <div style={{}}>
            <Typography align="center" variant="h6">
              ADMIN
            </Typography>
            <img
              src="https://cdn-icons-png.flaticon.com/512/236/236831.png"
              alt="img"
              style={{
                width: "9rem",
                height: "9rem",
                display: "flex",
                margin: "5px",
                borderRadius: "50%",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            />
          </div>
          <Divider />

          <List sx={{ marginTop: "10px" }}>
            {sidebarNavigationData.map((cur, index) => {
              return (
                <>
                  <Box key={cur.id}>
                    <ListItemButton
                      // selected={activeItem === index}
                      to={cur.to}
                      component={Link}
                      onClick={() => handleClick(index)}
                    >
                      <ListItemIcon>{cur.icon}</ListItemIcon>
                      <ListItemText>{cur.label}</ListItemText>
                    </ListItemButton>
                  </Box>
                </>
              );
            })}
          </List>
        </Drawer>
        <IconButton
          sx={{ color: "white", marginLeft: "auto" }}
          onClick={() => setOpenDrawer(!openDrawer)}
        >
          <MenuIcon />
        </IconButton>
      </AppLogout>
    </>
  );
};

export default Sidebar;
