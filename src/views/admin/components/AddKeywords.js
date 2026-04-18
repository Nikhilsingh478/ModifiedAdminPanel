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
  addKeywords,
  clearErrors,
} from "../../../redux/actions/admin/ManageKeywordAction";
import toast, { Toaster } from "react-hot-toast";

const AddKeywords = () => {

    const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [keywords, setKeywords] = useState("");

  //add keywords state
  const addKeywordsState = useSelector((state) => state.addKeywords);
  const { loading, success, error } = addKeywordsState;

  const openPrimaryCategoryDialog = () => {
    setOpen(true);
  };
  const closePrimaryCateDialog = () => {
    setOpen(false);
  };

  //add brand fun
  const submitHandler = (e) => {
    e.preventDefault();
    if (!keywords) {
      return toast.error("This field are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(addKeywords(keywords));
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
      toast.success("Keywords Added", {
        position: "top-center",
        duration: 3000,
      });
      dispatch({ type: "ADD_KEYWORDS_RESET" });
      closePrimaryCateDialog();
    }
  }, [dispatch, error, success, open]);



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

          <Tooltip title="Add Primary Category">
            <Button
              variant="contained"
              onClick={openPrimaryCategoryDialog}
              endIcon={<AddIcon />}
            >
              Keywords
            </Button>
          </Tooltip>
        </Toolbar>
      </div>

      <Dialog open={open} onClose={closePrimaryCateDialog}>
        <div
          style={{
            margin: "2rem",
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
              label="Enter Keywords"
              name="title"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 4 }}
            >
              ADD
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  )
}

export default AddKeywords