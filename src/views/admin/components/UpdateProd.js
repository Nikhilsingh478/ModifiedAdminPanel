import React, { useState, useEffect } from "react";
import { Dialog } from "@mui/material";
import { useParams } from "react-router-dom";
import { brandsList } from "../../../redux/actions/admin/brandAction";
import { keywordsList } from "../../../redux/actions/admin/ManageKeywordAction";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import {
  updateProduct,
  clearErrors,
} from "../../../redux/actions/admin/adminProductAction";
import toast, { Toaster } from "react-hot-toast";
import { hsnCodeList } from "../../../redux/actions/admin/hsnCodeAction";
import { allSubCateList } from "../../../redux/actions/admin/categoryAction";

const UpdateProd = ({
  open,
  setOpen,
  prodID,
  productName,
  setProductName,
  subCateID,
  setsubCateID,
  brandID,
  setBrandID,
  keywordID,
  setkeywordID,
  HSNCodeID,
  setHSNCodeID
}) => {
  const dispatch = useDispatch();
  const { id } = useParams("");

  // const [productName, setProductName] = useState("");
  // const [selectedKeyW, setSelectedKeyW] = useState("select");
  // const [selectedKeyWID, setSelectedKeyWID] = useState("");
  // const [selectedBrand, setSelectedBrand] = useState("select");
  // const [selectedBrandID, setSelectedBrandID] = useState("");
  // const [HsnCode, setHsnCode] = useState("");

  //brands list state
  const brandState = useSelector((state) => state.brandsList);
  const { brands } = brandState;

  //hsn code load state
  const hsnCodeState = useSelector((state) => state.hsncodeList);
  const { hsnCodes } = hsnCodeState;

  //load keywords state
  const keywordsState = useSelector((state) => state.keywordsList);
  const { keywords } = keywordsState;

  //load SUB category list
  const allSubCateListState = useSelector((state) => state.allSubCateList);
  const { allSubCate } = allSubCateListState;

  //update prod state
  const updateProdState = useSelector((state) => state.updateProduct);
  const { updateLoading, updateSuccess, updateError } = updateProdState;

  //handle the onchange onkeyword
  const handleKeywordSelected = (e) => {
    // const select = e.target;
    // const id = select.children[select.selectedIndex].id;
    // setSelectedKeyWID(id);
    // setSelectedKeyW(e.target.value);
    setkeywordID(e.target.value);
  };

  //handle the onchange onkeyword
  const handleBrandSelected = (e) => {
    // const select = e.target;
    // const id = select.children[select.selectedIndex].id;
    // setSelectedBrandID(id);
    // setSelectedBrand(e.target.value);
    setBrandID(e.target.value);
  };

  //onchage hsn
  const onSelectHSNCode = (event) => {
    // setHsnCode(event.target.value);
    setHSNCodeID(event.target.value)
  };

  //category select
  const handleSubCateSelect = (event) => {
    setsubCateID(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !productName ||
      !brandID ||
      !keywordID ||
      !subCateID ||
      !prodID ||
      !HSNCodeID
    ) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 2000,
      });
    }

    dispatch(
      updateProduct(
        prodID,
        productName,
        keywordID,
        subCateID,
        brandID,
        HSNCodeID

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
      toast.success("Product updated", {
        position: "top-center",
        duration: 3000,
      });
      setProductName("");
      // setSelectedKeyW("");
      // setSelectedBrand("");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
      setOpen(false);
    }
    dispatch(brandsList());
    dispatch(keywordsList());
    dispatch(hsnCodeList());
    dispatch(allSubCateList());
  }, [updateSuccess]);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            margin: "1.5rem",
          }}
        >
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
            defaultValue={HSNCodeID}
              style={{
                width: "34.5rem",
                height: "53px",
              }}
              onChange={onSelectHSNCode}
            >
              {/* <option value="">Select HSN Code</option> */}
              {hsnCodes &&
                hsnCodes.map((cur) => {
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
                        {cur.hsnNumber}
                      </option>
                    </>
                  );
                })}
            </select>

            {/* select keyword */}
            <select
              defaultValue={keywordID}
              style={{
                width: "34.5rem",
                height: "53px",
                marginTop: "8px",
              }}
              // value={selectedKeyW}
              onChange={handleKeywordSelected}
            >
              {/* <option value="">Select Keywords</option> */}
              {keywords
                ? keywords.map((cur) => {
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
                          {cur.keywords.slice(0, 85)}....
                        </option>
                      </>
                    );
                  })
                : null}
            </select>

            <br />
            {/* select brand */}
            <select
              defaultValue={brandID}
              style={{
                marginTop: "8px",
                width: "34.5rem",
                height: "53px",
              }}
              // value={selectedBrand}

              onChange={handleBrandSelected}
            >
              {/* <option value="">Select Brand</option> */}
              {brands ? (
                brands.map((cur) => {
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
                        {cur.brandName}
                      </option>
                    </>
                  );
                })
              ) : (
                <option value="">Loading ...</option>
              )}
            </select>

            {/* select SUB Category */}
            <select
              defaultValue={id}
              style={{
                width: "34.5rem",
                height: "53px",
                marginTop: "8px",
              }}
              onChange={handleSubCateSelect}
            >
              {allSubCate ? (
                allSubCate.map((cur) => {
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
                        {cur.subCategoryName}
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
          <Toaster />
        </div>
      </Dialog>
    </>
  );
};

export default UpdateProd;
