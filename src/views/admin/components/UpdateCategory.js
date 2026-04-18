import React,{useEffect} from 'react'
import {Dialog,Box,CircularProgress,TextField,Button,Backdrop} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  updatePrimaryCategory,
  clearErrors,
} from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateCategory = ({open,setOpen,updateCategoryId,categoryName,setCategoryName}) => {

  const dispatch = useDispatch();

  //update primary cate state
  const updatePrimaryCateState = useSelector(
    (state) => state.updatePrimaryCategory
  );
  const { updateLoading, updateSuccess, updateError } = updatePrimaryCateState;

    //update category
  const updateCategory = (e) => {
    e.preventDefault();
    if (!categoryName) {
      return toast.error("required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(updatePrimaryCategory(categoryName, updateCategoryId));
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
      toast.success("Category updated", {
        position: "top-center",
        duration: 3000,
      });
      setCategoryName("");
      dispatch({ type: "UPDATE_PRIMARYCATEGORY_RESET" });
      setOpen(false);
    }

  }, [ updateSuccess, dispatch]);


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
                  onSubmit={updateCategory}
                  noValidate
                  className="create-note"
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label="Enter Primary Category Name"
                    name="title"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    autoFocus
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 4 }}
                  >
                    Update
                  </Button>
                </Box>
              </div>
            </Dialog>
            <Toaster />
    </>
  )
}

export default UpdateCategory