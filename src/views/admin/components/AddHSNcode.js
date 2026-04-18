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

          <Tooltip title="Add HSN Code">
            <Button
              variant="contained"
              onClick={openHSNCodeDialog}
              startIcon={<AddIcon />}
            >
              HSN
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
              sx={{ mt: 1, mb: 1 }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddHSNcode;
