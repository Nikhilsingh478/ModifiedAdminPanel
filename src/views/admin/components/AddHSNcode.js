import React, { useState, useEffect } from "react";
import {
  Dialog,
  Toolbar,
  Typography,
  Tooltip,
  Button,
  Box,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import toast, { Toaster } from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  addHsnCode,
  clearErrors,
} from "../../../redux/actions/admin/hsnCodeAction";
import { useHistory } from "react-router-dom";

const adminActionButtonSx = {
  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  color: "#ffffff",
  fontWeight: 600,
  padding: "8px 18px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "0.875rem",
  minWidth: "140px",
  whiteSpace: "nowrap",
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
  mt: 1,
  mb: 1,
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

const AddHSNcode = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [hsnCode, setHsnCode] = useState("");

  //add HSN state
  const addHsnCodeState = useSelector((state) => state.addHSN);
  const { addloading, success, error } = addHsnCodeState;

  const openHSNCodeDialog = () => {
    setOpen(true);
  };
  const closeHSNCodeDialog = () => {
    setOpen(false);
  };
  //add the primary category fun
  const submitHandler = (e) => {
    e.preventDefault();
    if (!hsnCode) {
      return toast.error("HSN Code is required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(addHsnCode(hsnCode));
  };

  const resetHandler = () => {
    setHsnCode("");
  };
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("HSN Code Added", {
        position: "top-center",
        duration: 3000,
      });
      dispatch({ type: "ADD_HSNCODE_RESET" });
      closeHSNCodeDialog();
      resetHandler();
    }
  }, [dispatch, error, success]);

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

          <Tooltip title="Add HSN Code">
            <Button
              variant="contained"
              onClick={openHSNCodeDialog}
              startIcon={<AddIcon />}
              sx={adminActionButtonSx}
            >
              HSN Code
            </Button>
          </Tooltip>
        </Toolbar>
      </div>

      <Dialog open={open} onClose={closeHSNCodeDialog}>
        <div
          style={{
            margin: "1.5rem",
          }}
        >
          {addloading ? (
            <>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={addloading}
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
              label="Enter Product HSN Code"
              name="title"
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={adminSubmitButtonSx}
            >
              Add HSN Code
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddHSNcode;
