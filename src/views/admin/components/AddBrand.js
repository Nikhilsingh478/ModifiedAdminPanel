import React, { useState, useEffect } from "react";
import {
  Dialog,
  Toolbar,
  Typography,
  Tooltip,
  Button,
  TextField,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addBrand,
  clearErrors,
} from "../../../redux/actions/admin/brandAction";
import toast, { Toaster } from "react-hot-toast";

const adminActionButtonSx = {
  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  color: "#ffffff",
  fontWeight: 600,
  padding: "8px 18px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "0.875rem",
  minWidth: "128px",
  boxShadow: "0 6px 16px -10px rgba(5, 150, 105, 0.7)",
  transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    boxShadow: "0 10px 22px -12px rgba(4, 120, 87, 0.75)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 6px 16px -12px rgba(4, 120, 87, 0.7)",
  },
};

const adminSubmitButtonSx = {
  mt: 2,
  mb: 4,
  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  color: "#ffffff",
  fontWeight: 600,
  padding: "10px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "0.875rem",
  boxShadow: "0 6px 16px -10px rgba(5, 150, 105, 0.7)",
  transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
    boxShadow: "0 10px 22px -12px rgba(4, 120, 87, 0.75)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
    boxShadow: "0 6px 16px -12px rgba(4, 120, 87, 0.7)",
  },
};

const AddBrand = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [brandName, setBrandName] = useState("");

  //add brand state
  const addBrandState = useSelector((state) => state.addBrand);
  const { loading, success, error } = addBrandState;

  const openPrimaryCategoryDialog = () => {
    setOpen(true);
  };
  const closePrimaryCateDialog = () => {
    setOpen(false);
  };

  //add brand fun
  const submitHandler = (e) => {
    e.preventDefault();
    if (!brandName) {
      return toast.error("This field are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(addBrand(brandName));
  };

  //useeffect for error or success
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Brand Added", {
        position: "top-center",
        duration: 3000,
      });
      dispatch({ type: "ADD_BRAND_RESET" });
      closePrimaryCateDialog();
    }
  }, [dispatch, error, success, open]);

  return (
    <>
      <div className="add-button-subHeader">
        <Toolbar>
          <Typography
            sx={{ flex: "1 1 100%", display: 'flex', alignItems: 'center', gap: '24px' }}
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

          <Tooltip title="Add Brand">
            <Button
              variant="contained"
              onClick={openPrimaryCategoryDialog}
              startIcon={<AddIcon />}
              sx={adminActionButtonSx}
            >
              Brand
            </Button>
          </Tooltip>
        </Toolbar>
      </div>

      <Dialog open={open} onClose={closePrimaryCateDialog}>
        <div
          style={{
            margin: "1.5rem",
          }}
        >
          {loading ? (
            <>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          ) : null}
          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            className="create-note"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter Sub Category Title"
              name="title"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={adminSubmitButtonSx}
            >
              Add Brand
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddBrand;
