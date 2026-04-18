import React, { useEffect } from "react";
import {
  Dialog,
  Box,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  updateSubProduct,
  allProductsList,
} from "../../../redux/actions/admin/adminProductAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateSubProd = ({
  open,
  setOpen,
  subProductID,
  subProductName,
  setSubProductName,
  buyingPrice,
  setBuyingPrice,
  sellingPrice,
  setSellingPrice,
  gst,
  setGst,
  discountPercent,
  setDiscountPercent,
  MRP,
  setMRP,
  productID,
  setProductID,
}) => {
  const dispatch = useDispatch();
  const { id } = useParams("");

  //update sub prod state
  const updateSubProdState = useSelector((state) => state.updateSubProduct);
  const { updateLoading, updateSuccess, updateError } = updateSubProdState;

  //get all products list state
  const allProductsListState = useSelector((state) => state.allProductsList);
  const { allProducts } = allProductsListState;

  //onchage on select product
  const onSelectProduct = (event) => {
    setProductID(event.target.value);
  };

  //UPDATE the sub product
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !subProductName ||
      !buyingPrice ||
      !sellingPrice ||
      !gst ||
      !productID ||
      !MRP
    ) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }

    dispatch(
      updateSubProduct(
        subProductName,
        buyingPrice,
        sellingPrice,
        gst,
        discountPercent,
        MRP,
        productID,
        subProductID
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
      toast.success("update success", {
        position: "top-center",
        duration: 3000,
      });
      setSubProductName("");
      setBuyingPrice("");
      setSellingPrice("");
      setGst("");
      setDiscountPercent("");
      setMRP("");
      dispatch({ type: "UPDATE_SUBPRODUCT_RESET" });
      setOpen(false);
    }

    dispatch(allProductsList());
  }, [updateSuccess]);
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
              label="Enter buying Price (without GST)"
              type="number"
              name="title"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
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
              onChange={(e) => setSellingPrice(e.target.value)}
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
              onChange={(e) => setGst(e.target.value)}
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

            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="Enter MRP"
              type="number"
              name="title"
              value={MRP}
              onChange={(e) => setMRP(e.target.value)}
              autoFocus
            />

            {/* select Product */}
            <select
              defaultValue={productID}
              style={{
                width: "34.5rem",
                height: "53px",
                marginTop: "8px",
              }}
              onChange={onSelectProduct}
            >
              {allProducts ? (
                allProducts.map((cur) => {
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
                        {cur.productName}
                      </option>
                    </>
                  );
                })
              ) : (
                <option value="">Loading sub categories...</option>
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
      <Toaster />
    </>
  );
};

export default UpdateSubProd;
