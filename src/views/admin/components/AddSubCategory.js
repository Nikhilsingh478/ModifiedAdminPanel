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
import axios from "axios";
import store from "../../../store";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategory,
  clearErrors,
} from "../../../redux/actions/admin/categoryAction";

const AddSubCategory = () => {

  
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyW, setSelectedKeyW] = useState("select");
  const [selectedKeyWID, setSelectedKeyWID] = useState("");
  const [base64Data, setBase64Data] = useState(null);
  const { id } = useParams("");

  //sub category adding result
  const addSubCategoryState = useSelector((state) => state.addSubCategory);
  const { loading, success, error } = addSubCategoryState;

  const openPrimaryCategoryDialog = () => {
    setOpen(true);
  };
  const closePrimaryCateDialog = () => {
    setOpen(false);
  };

  //get all the keywords
  const getKeywords = async () => {
    const user = store.getState().LoginUserReducer.userInfo;
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/keyword`, {
        headers: {
          emailId: user.emailId,
          password: user.password,
        },
      });

      setKeywords(data);
    } catch (error) {
    }
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
    let binaryString = e.target.result;
    setBase64Data(btoa(binaryString));
  };

  //handle the onchange onkeyword
  const handleKeywordSelected = (e) => {
    const select = e.target;
    const id = select.children[select.selectedIndex].id;
    setSelectedKeyWID(id);
    setSelectedKeyW(e.target.value);
  };

  //add the sub cate
  const submitHandler = (e) => {
    e.preventDefault();
    if (!subCategoryName || !base64Data || !selectedKeyW || !id) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }
    dispatch(addSubCategory(subCategoryName, id, selectedKeyWID, base64Data));
    // history.push("/admin/category");
  };

  const resetHandler = ()=>{
    setSubCategoryName("");
    setSelectedKeyWID("");
    setSelectedKeyW("");
    setBase64Data("");
  }
  useEffect(() => {
    getKeywords();

    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      dispatch(clearErrors());
      closePrimaryCateDialog();
    }
    if (success) {
      toast.success("SubCategory Added", {
        position: "top-center",
        duration: "3000",
      });
      dispatch({ type: "ADD_SUBCATEGORY_RESET" });
      resetHandler();
      closePrimaryCateDialog();
    }
  }, [dispatch, error, success, history]);

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
               onClick={()=>history.goBack()}
            />
          </Typography>

          <Tooltip title="Add Primary Category">
            <Button
              variant="contained"
              onClick={openPrimaryCategoryDialog}
              endIcon={<AddIcon />}
            >
              SubCategory
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
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              autoFocus
            />

            {/* select keyword */}
            <select
              style={{
                width: "34.5rem",
                height: "53px",
              }}
              value={selectedKeyW}
              onChange={handleKeywordSelected}
            >
             <option value="">Select Keywords</option>
              {keywords.map((cur) => {
                return (
                  <>
                    <option
                      id={cur.id}
                      style={{
                        width: "30rem",
                        height: "10px",
                        fontSize: "14px",
                      }}
                    >
                      {cur.keywords.slice(0, 85)}...
                    </option>
                  </>
                );
              })}
            </select>

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
              {base64Data && (
                <img
                  src={`data:image;base64,${base64Data}`}
                  alt="Subcategory preview"
                  style={{
                    marginLeft: "5px",
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
            </div>

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
  );
};

export default AddSubCategory;
