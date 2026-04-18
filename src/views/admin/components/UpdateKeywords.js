import React, { useEffect } from "react";
import {
  Dialog,
  Box,
  CircularProgress,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  updateKeywords,
} from "../../../redux/actions/admin/ManageKeywordAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateKeywords = ({
  open,
  setOpen,
  updatekeyID,
  updatekeyText,
  setUpdatekeyText,
}) => {

    
  const dispatch = useDispatch();

  //update primary cate state
  const updateKeywordState = useSelector((state) => state.updateKey);
  const { updateLoading, updateSuccess, updateError } = updateKeywordState;

  const updateKeyword = (e) => {
    e.preventDefault();

    if (!updatekeyText) {
      return toast.error("required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(updateKeywords(updatekeyText, updatekeyID));
  };

    useEffect(() => {
    if (updateError) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
      // closePrimaryCateDialog();
    }
    if (updateSuccess) {
      toast.success("Keywords updated", {
        position: "top-center",
        duration: 3000,
      });
      setUpdatekeyText("");
      dispatch({ type: "UPDATE_KEYWORD_RESET" });
      setOpen(false);
    }

  }, [dispatch, setOpen, setUpdatekeyText, updateError, updateSuccess]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            margin: "1.5rem",
          }}
        >
          {updateLoading ? (
            <>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={updateLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          ) : null}
          <Box
            component="form"
            onSubmit={updateKeyword}
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
              value={updatekeyText}
              onChange={(e) => setUpdatekeyText(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 4 }}
            >
              Update Keyword
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default UpdateKeywords;
