import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  updateSubCategory,
  clearErrors,
} from "../../../redux/actions/admin/categoryAction";
import { keywordsList } from "../../../redux/actions/admin/ManageKeywordAction";
import { allPrimaryCateList } from "../../../redux/actions/admin/categoryAction";

const UpdateSubCate = ({
  open,
  setOpen,
  subCategoryID,
  id,
  subCategoryName,
  setSubCategoryName,
  // selectedKeyWID,
  // setSelectedKeyWID,
  // selectedKeyW,
  // setSelectedKeyW,
  selectedKeyWID,
  setSelectedKeyWID,
  setcategoryID,
  categoryID,
}) => {
  const dispatch = useDispatch();
  //update primary cate state
  const updateSubCateState = useSelector((state) => state.updateSubCategory);
  const { updateLoading, updateSuccess, updateError } = updateSubCateState;

  // keywords state
  const keywordsState = useSelector((state) => state.keywordsList);
  const { keywords } = keywordsState;

  //allPrimaryCateList state
  const allPRMCateListState = useSelector((state) => state.allPRMCateList);
  const { allCategory } = allPRMCateListState;

  //handle the onchange onkeyword
  const handleKeywordSelected = (e) => {
    // const select = e.target;
    // const id = select.children[select.selectedIndex].id;
    // setSelectedKeyWID(id);
    // setSelectedKeyW(e.target.value);
    setSelectedKeyWID(e.target.value);
  };

  //category select
  const handleCateSelect = (event) => {
    setcategoryID(event.target.value);
  };

  //update the sub cate
  const submitHandler = (e) => {
    e.preventDefault();
    if (!subCategoryName || !selectedKeyWID || !categoryID) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }
    dispatch(
      updateSubCategory(
        subCategoryName,
        categoryID,
        subCategoryID,
        selectedKeyWID
      )
    );
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
      toast.success("Sub Category updated", {
        position: "top-center",
        duration: 3000,
      });
      setSubCategoryName("");
      dispatch({ type: "UPDATE_SUBCATEGORY_RESET" });
      setOpen(false);
    }

    dispatch(keywordsList());
    dispatch(allPrimaryCateList());
  }, [updateSuccess, dispatch]);

  return (
    <>
      {/* update sub category dial */}
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
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              autoFocus
            />

            {/* select keyword */}
            <select
              defaultValue={selectedKeyWID}
              style={{
                width: "34.5rem",
                height: "53px",
              }}
              // value={selectedKeyW}
              onChange={handleKeywordSelected}
            >
              {keywords
                ? keywords.map((cur) => {
                    return (
                      <>
                        <option
                          // id={cur.id}
                        key={cur.id}
                        value={cur.id}
                          style={{
                            width: "30rem",
                            height: "10px",
                            fontSize: "14px",
                          }}
                        >
                          {cur.keywords.slice(0, 85)}....
                        </option>
                      </>
                    );
                  })
                : null}
            </select>

            {/* select Category */}
            <select
              defaultValue={id}
              // value={id}
              style={{
                width: "34.5rem",
                height: "53px",
                marginTop: "8px",
              }}
              onChange={handleCateSelect}
            >
              {allCategory ? (
                allCategory.map((cur) => {
                  return (
                    <>
                      <option
                        key={cur.id}
                        value={cur.id}
                        style={{
                          width: "30rem",
                          height: "10px",
                          fontSize: "14px",
                        }}
                      >
                        {cur.primaryCategoryName}
                      </option>
                    </>
                  );
                })
              ) : (
                <option value="">Loading categories...</option>
              )}
            </select>

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
    </>
  );
};

export default UpdateSubCate;
