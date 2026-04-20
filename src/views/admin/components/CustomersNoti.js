import React, { useState } from "react";
import {
  Dialog,
  Badge,
  Toolbar,
  Typography,
  InputBase,
  Box,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useHistory } from "react-router-dom";


const Search = styled("Box")(({ theme }) => ({
  backgroundColor: "#1B1F26",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #2A2F3A",
  width: "30%",
  margin: "8px",
}));


const CustomersNoti = ({ users, setSearch }) => {

  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="add-button-subHeader">
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <ArrowBackIcon
              style={{
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => history.goBack()}
            />
          </Typography>

          <Search>
            <InputBase
              placeholder="Search User..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>

          <Badge badgeContent={users ? users.length : null} color="error">
            <NotificationsIcon
              style={{
                color: "#dfe2e8",
              }}
              onClick={() => setOpen(true)}
            />
          </Badge>
        </Toolbar>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box m={3}>
            {users && (
              <ul>
                {users.map((user) => (
                  <li key={user.fullName}>{user.fullName}</li>
                ))}
              </ul>
            )}
          </Box>
        </Dialog>
      </div>
    </>
  );
};

export default CustomersNoti;
