import React, { useState, useEffect } from "react";
import { Dialog, CircularProgress, Button, Backdrop } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  updatePrimaryCateImage,
} from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";

const CategoryImageUpdate = ({
  openUpdateImgDial,
  setOpenUpdateImgDial,
  photo,
  upImageId,
}) => {
  const dispatch = useDispatch();
  const [base64Data, setBase64Data] = useState(null);
  const [selectedFileName, setselectedFileName] = useState("");

  // updatePrimaryCateImg state
  const updatePrimaryCateImgState = useSelector(
    (state) => state.updatePrimaryCateImg
  );
  const { updateImgLoading, updateImgSuccess, updateImgError } =
    updatePrimaryCateImgState;

  //convert the image into base64
  const onChange = (e) => {
    let file = e.target.files[0];
    setselectedFileName(e.target.files[0].name);
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

  const updateImage = () => {
    if (!base64Data) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(updatePrimaryCateImage(upImageId, base64Data));
  };

  const resetHandler = () => {
    setBase64Data("");
    setselectedFileName("");
  };

  useEffect(() => {
    if (updateImgError) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
    }
    if (updateImgSuccess) {
      setOpenUpdateImgDial(false);
      toast.success("Image Updated Successfully", {
        position: "top-center",
        duration: 3000,
      });
      dispatch({ type: "UPDATE_PRIMARYCATEIMG_RESET" });
      resetHandler();
    }
  }, [dispatch, setOpenUpdateImgDial, updateImgError, updateImgSuccess]);

  return (
    <>
      <Dialog
        open={openUpdateImgDial}
        onClose={() => setOpenUpdateImgDial(false)}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          {updateImgLoading ? (
            <>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={updateImgLoading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </>
          ) : null}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={photo}
              alt="Primary category"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
          </div>
          <br />

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
            <label htmlFor="file">{selectedFileName}</label>
            <br />
            <div
              style={{
                display: "flex",
                marginTop: "5px",
              }}
            ></div>
          </div>

          <Button
            type="submit"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "1rem",
            }}
            variant="contained"
            onClick={() => updateImage()}
          >
            Update Image
          </Button>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default CategoryImageUpdate;
