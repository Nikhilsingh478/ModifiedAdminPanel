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
      <div className="add-button-subHeader" style={{ border: 'none', outline: 'none', boxShadow: 'none' }}>
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
              sx={{
                background: '#1976d2',
                color: 'white',
                fontWeight: 500,
                padding: '8px 20px',
                borderRadius: '6px',
                textTransform: 'none',
                fontSize: '0.875rem',
                minWidth: '120px',
                border: 'none !important',
                outline: 'none !important',
                boxShadow: 'none !important',
                '& .MuiButton-root': {
                  border: 'none !important',
                },
                '& .MuiOutlinedInput-root': {
                  border: 'none !important',
                },
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  background: '#1565c0',
                  border: 'none !important',
                  boxShadow: 'none !important',
                },
                '&:active': {
                  background: '#0d47a1',
                  border: 'none !important',
                  boxShadow: 'none !important',
                },
                '&:focus': {
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  border: 'none !important',
                },
                '&:focus-visible': {
                  outline: 'none !important',
                  boxShadow: 'none !important',
                  border: 'none !important',
                }
              }}
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
              sx={{ 
                mt: 2, 
                mb: 4,
                background: '#2e7d32',
                color: 'white',
                fontWeight: 500,
                padding: '10px',
                borderRadius: '6px',
                textTransform: 'none',
                fontSize: '0.875rem',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  background: '#1b5e20',
                },
                '&:active': {
                  background: '#1b5e20',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                }
              }}
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
