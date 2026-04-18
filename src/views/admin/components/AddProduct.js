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
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import store from "../../../store";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  clearErrors,
} from "../../../redux/actions/admin/adminProductAction";
import { hsnCodeList } from "../../../redux/actions/admin/hsnCodeAction";

const AddProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [base64Data, setBase64Data] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyW, setSelectedKeyW] = useState("select");
  const [selectedKeyWID, setSelectedKeyWID] = useState("");
  const { id } = useParams("");
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("select");
  const [selectedBrandID, setSelectedBrandID] = useState("");
  const [HsnCode, setHsnCode] = useState("");

  //add product result
  const addProductState = useSelector((state) => state.addProduct);
  const { loading, success, error } = addProductState;

  //hsn code load state
  const hsnCodeState = useSelector((state) => state.hsncodeList);
  const { hsnCodes } = hsnCodeState;

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
    let binaryString = e.target.result;
    setBase64Data(btoa(binaryString));
  };

  //get all the keywords
  const getKeywords = async () => {
    const user = store.getState().LoginUserReducer.userInfo;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/keyword`,
        {
          headers: {
            emailId: user.emailId,
            password: user.password,
          },
        }
      );

      setKeywords(data);
    } catch (error) {
    }
  };
  //handle the onchange onkeyword
  const handleKeywordSelected = (e) => {
    const select = e.target;
    const id = select.children[select.selectedIndex].id;
    setSelectedKeyWID(id);
    setSelectedKeyW(e.target.value);
  };

  //onchage category
  const onSelectHSNCode = (event) => {
    setHsnCode(event.target.value);
  };

  //get all the barands
  const getBrands = async () => {
    const user = store.getState().LoginUserReducer.userInfo;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/brand`,
        {
          headers: {
            emailId: user.emailId,
            password: user.password,
          },
        }
      );

      setBrands(data);
    } catch (error) {
    }
  };

  //handle the onchange onkeyword
  const handleBrandSelected = (e) => {
    const select = e.target;
    const id = select.children[select.selectedIndex].id;
    setSelectedBrandID(id);
    setSelectedBrand(e.target.value);
  };

  //add the main product
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !productName ||
      !base64Data ||
      !selectedBrand ||
      !selectedKeyW ||
      !HsnCode
    ) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }
    dispatch(
      addProduct(
        productName,
        id,
        selectedKeyWID,
        selectedBrandID,
        base64Data,
        HsnCode
      )
    );
  };
  const resetHandler = () => {
    setProductName("");
    setSelectedKeyWID("");
    setSelectedKeyW("");
    setSelectedBrandID("");
    setSelectedBrand("");
    setBase64Data("");
  };
  useEffect(() => {
    getKeywords();
    getBrands();
    dispatch(hsnCodeList());
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      dispatch(clearErrors());
      closePrimaryCateDialog();
    }
    if (success) {
      toast.success("Product Added", {
        position: "top-center",
      });
      dispatch({ type: "ADD_PRODUCT_RESET" });
      resetHandler();
      closePrimaryCateDialog();
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

          <Tooltip title="Add Primary Category">
            <Button
              variant="contained"
              onClick={openPrimaryCategoryDialog}
              startIcon={<AddIcon />}
            >
              Product
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
              label="Enter Product Name"
              name="title"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              autoFocus
            />

            {/* select HSN code */}
            <select
              style={{
                width: "34.5rem",
                height: "53px",
              }}
              onChange={onSelectHSNCode}
            >
              <option value="">Select HSN Code</option>
              {hsnCodes &&
                hsnCodes.map((cur) => {
                  return (
                    <>
                      <option
                        value={cur.id}
                        id={cur.id}
                        style={{
                          width: "30rem",
                          height: "10px",
                          fontSize: "14px",
                        }}
                      >
                        {cur.hsnNumber}
                      </option>
                    </>
                  );
                })}
            </select>
            

            {/* select keyword */}
            <select
              style={{
                width: "34.5rem",
                height: "53px",
                 marginTop: "8px",
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

            <br />
            {/* select brand */}
            <select
              style={{
                marginTop: "8px",
                width: "34.5rem",
                height: "53px",
              }}
              value={selectedBrand}
              onChange={handleBrandSelected}
            >
              <option value="">Select Brand</option>
              {brands.map((cur) => {
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
                      {cur.brandName}
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
              {base64Data && (
                <img
                  src={`data:image;base64,${base64Data}`}
                  alt="Product preview"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
              <input
                type="file"
                name="image"
                id="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => onChange(e)}
              />
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

export default AddProduct;
