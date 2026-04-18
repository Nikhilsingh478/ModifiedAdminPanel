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
  addPrimaryCategory,
  clearErrors,
} from "../../../redux/actions/admin/categoryAction";
import { useHistory } from "react-router-dom";

const AddCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [primarycategory, setPrimaryCategory] = useState("");
  const [base64Data, setBase64Data] = useState(null);

  //add primary cate result
  const addPrimaryCateState = useSelector((state) => state.addPrimaryCategory);
  const { loading, success, error } = addPrimaryCateState;

  const openPrimaryCategoryDialog = () => {
    setOpen(true);
  };
  const closePrimaryCateDialog = () => {
    setOpen(false);
  };

  //convert the image into base64
  const onChange = (e) => {
    let file = e.target.files[0];
    const fileSizeLimit = 512000;
    if (file.size > fileSizeLimit) {
      alert("File size exceeds limit of 500 KB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded.bind(e);
      reader.readAsBinaryString(file);
    }
  };
  const _handleReaderLoaded = (e) => {
    // console.log("file uploaded 2: ", e);
    let binaryString = e.target.result;
    setBase64Data(btoa(binaryString));
  };

  //add the primary category fun
  const submitHandler = (e) => {
    e.preventDefault();
    if (!primarycategory || !base64Data) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(addPrimaryCategory(primarycategory, base64Data));
  };

  const resetHandler = ()=>{
    setPrimaryCategory("");
    setBase64Data("");
  }
  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
      closePrimaryCateDialog();
    }
    if (success) {
      toast.success("Category Added", {
        position: "top-center",
        duration: 3000,
      });
      dispatch({ type: "ADD_PRIMARYCATEGORY_RESET" });
      closePrimaryCateDialog();
      resetHandler();
    }
  }, [dispatch, error, success]);

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

          <Tooltip title="Add Primary Category">
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
              Category
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
              label="Enter Primary Category Name"
              name="title"
              value={primarycategory}
              onChange={(e) => setPrimaryCategory(e.target.value)}
              autoFocus
            />

            {/* image */}
            <div
              className="fileUpoption"
              style={{
                marginTop: "10px",
              }}
            >
              <input
                type="file"
                name="image"
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => onChange(e)}
              />
              <br />
              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                }}
              >
                {base64Data && (
                  <img
                    src={`data:image;base64,${base64Data}`}
                    alt="Primary category preview"
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "auto",
                      marginLeft: "auto",
                    }}
                  />
                )}
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 4,
                background: '#1976d2',
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
                  background: '#1565c0',
                },
                '&:active': {
                  background: '#0d47a1',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: 'none',
                }
              }}
            >
              Add Category
            </Button>
          </Box>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddCategory;
