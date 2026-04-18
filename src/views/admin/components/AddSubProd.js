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
import toast, { Toaster } from "react-hot-toast";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  addSubProduct,
} from "../../../redux/actions/admin/adminProductAction";

const AddSubProd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [subProductName, setSubProductName] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [gst, setGst] = useState("");
  const [MRP, setMRP] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [base64DataOne, setBase64DataOne] = useState(null);
  const [base64DataTwo, setBase64DataTwo] = useState(null);
  const [totalBuyingPrice, setTotalBuyingPrice] = useState(0);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const { id } = useParams("");

  //handling Total buying price
  function handleBuyingPriceChange(event) {
    const newBuyingPrice = Number(event.target.value);
    setBuyingPrice(newBuyingPrice);
    const newTotalBuyingPrice = newBuyingPrice + newBuyingPrice * (gst / 100);
    setTotalBuyingPrice(newTotalBuyingPrice);
  }

  function handleGstPercentageChange(event) {
    const newGstPercentage = Number(event.target.value);
    setGst(newGstPercentage);
    const newTotalBuyingPrice =
      buyingPrice + buyingPrice * (newGstPercentage / 100);
    setTotalBuyingPrice(newTotalBuyingPrice);

    // const newTotalSellingPrice =
    //   sellingPrice + (newTotalBuyingPrice - buyingPrice);
    // setTotalSellingPrice(newTotalSellingPrice);
    const newTotalSellingPrice =
      sellingPrice + sellingPrice * (newGstPercentage / 100);
    setTotalSellingPrice(newTotalSellingPrice);
  }

  //handling Total Selling price

  function handleSellingPriceChange(event) {
    const newSellingPrice = Number(event.target.value);
    setSellingPrice(newSellingPrice);
    const newTotalSellingPrice =
      newSellingPrice + newSellingPrice * (gst / 100);
    setTotalSellingPrice(newTotalSellingPrice);
  }

  // add sub product result
  const addSubProductState = useSelector((state) => state.addSubProduct);
  const { loading, success, error } = addSubProductState;

  const openPrimaryCategoryDialog = () => {
    setOpen(true);
  };
  const closePrimaryCateDialog = () => {
    setOpen(false);
  };

  //convert the image into base64One
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
    setBase64DataOne(btoa(binaryString));
  };

  //convert the image into base64Two
  const onChangeTwo = (e) => {
    let file = e.target.files[0];
    const fileSizeLimit = 512000;
    if (file.size > fileSizeLimit) {
      alert("File size exceeds limit of 500 KB");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoadedTwo.bind(e);
      reader.readAsBinaryString(file);
    }
  };
  const _handleReaderLoadedTwo = (e) => {
    let binaryString = e.target.result;
    setBase64DataTwo(btoa(binaryString));
  };

  //add the sub product
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !subProductName ||
      !buyingPrice ||
      !sellingPrice ||
      !gst ||
      !id ||
      !discountPercent ||
      !base64DataOne ||
      !base64DataTwo ||
      !MRP
    ) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }

    dispatch(
      addSubProduct(
        subProductName,
        buyingPrice,
        sellingPrice,
        gst,
        discountPercent,
        id,
        base64DataOne,
        base64DataTwo,
        MRP
      )
    );
  };

  const resetHandler = () => {
    setSubProductName("");
    setBuyingPrice("");
    setSellingPrice("");
    setGst("");
    setDiscountPercent("");
    setBase64DataOne("");
    setBase64DataTwo("");
    setTotalBuyingPrice("");
    setTotalSellingPrice("");
    setMRP("")
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      dispatch(clearErrors());
      closePrimaryCateDialog();
    }
    if (success) {
      toast.success("Sub Product Added", {
        position: "top-center",
      });
      dispatch({ type: "ADD_SUBPRODUCT_RESET" });
      closePrimaryCateDialog();
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

          <Tooltip title="Add Primary Category">
            <Button
              variant="contained"
              onClick={openPrimaryCategoryDialog}
              startIcon={<AddIcon />}
            >
              SubProduct
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
              label="Enter SubProduct Name"
              name="title"
              value={subProductName}
              onChange={(e) => setSubProductName(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter GST in %"
              type="number"
              name="title"
              value={gst}
              // onChange={(e) => setGst(e.target.value)}
              onChange={handleGstPercentageChange}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter buying Price (without GST)"
              type="number"
              name="title"
              value={buyingPrice}
              // onChange={(e) => setBuyingPrice(e.target.value)}
              onChange={handleBuyingPriceChange}
              autoFocus
            />

            {/* <p>Total Buying Price: {totalBuyingPrice}</p> */}
            <TextField
              margin="normal"
              disabled={true}
              required
              fullWidth
              id="text"
              label="Total buying Price"
              type="number"
              name="title"
              value={totalBuyingPrice}
              // onChange={(e) => setSellingPrice(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter Selling Price (without GST)"
              type="number"
              name="title"
              value={sellingPrice}
              // onChange={(e) => setSellingPrice(e.target.value)}
              onChange={handleSellingPriceChange}
              autoFocus
            />

            <TextField
              margin="normal"
              disabled={true}
              required
              fullWidth
              id="text"
              label="Total Selling Price"
              type="number"
              name="title"
              value={totalSellingPrice}
              // onChange={(e) => setSellingPrice(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter MRP"
              type="number"
              name="MRP"
              value={MRP}
              onChange={(e) => setMRP(e.target.value)}
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter Discount in %"
              type="number"
              name="title"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              autoFocus
            />

            {/* image 2*/}
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
              />{" "}
              {base64DataOne && (
                <img
                  src={`data:image;base64,${base64DataOne}`}
                  alt="Subproduct first preview"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              )}
            </div>

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
                onChange={(e) => onChangeTwo(e)}
              />{" "}
              {base64DataTwo && (
                <img
                  src={`data:image;base64,${base64DataTwo}`}
                  alt="Subproduct second preview"
                  style={{
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

export default AddSubProd;
