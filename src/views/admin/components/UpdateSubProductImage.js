import React, { useState, useEffect } from "react";
import { Dialog, CircularProgress, Button, Backdrop } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import {
  clearErrors,
  updateSubProdImg
} from "../../../redux/actions/admin/adminProductAction";
import { useDispatch, useSelector } from "react-redux";

const UpdateSubProductImage = ({
  openUpdateImgDial,
  setOpenUpdateImgDial,
  photoOne,
  photoTwo,
  upImageId,
}) => {


  const dispatch = useDispatch();
  const [base64DataOne, setBase64DataOne] = useState(photoOne);
  const [base64DataTwo, setBase64DataTwo] = useState(photoTwo);

  const [selectedFileNameOne, setselectedFileNameOne] = useState("");
  const [selectedFileNameTwo, setselectedFileNameTwo] = useState("");


  //   updateSubProdImg state
  const updateSubProdImgState = useSelector((state) => state.updateSubProdImg);
  const { updateImgLoading, updateImgSuccess, updateImgError } = updateSubProdImgState;


  //convert the image into base64One
  const onChange = (e) => {
    let file = e.target.files[0];
    setselectedFileNameOne(e.target.files[0].name);
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
    setselectedFileNameTwo(e.target.files[0].name);
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


   const updateImage = () => {
    if (!base64DataOne || !base64DataTwo) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(updateSubProdImg(upImageId, base64DataOne,base64DataTwo));
  };


const resetHandler = () => {
    setBase64DataOne("");
    setBase64DataTwo("");
    setselectedFileNameOne("");
    setselectedFileNameTwo("");
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
      dispatch({ type: "UPDATE_PRODIMG_RESET" });
      resetHandler();
    }
  }, [dispatch, updateImgError, updateImgSuccess]);



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
              border: "1px solid #e6e6e6",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width:"95%"
            }}
          >
            <img
              src={photoOne}
              style={{
                width: "50%",
                height: "50%",
                margin: "8px",
              }}
            />

            <img
              src={photoTwo}
              style={{
                width: "50%",
                height: "50%",
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
            <label htmlFor="file">{selectedFileNameOne}</label>

            <br />
            <br />

            <input
              type="file"
              name="image"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => onChangeTwo(e)}
            />
            <label htmlFor="file">{selectedFileNameTwo}</label>
            <br />
            <div
              style={{
                display: "flex",
                marginTop: "5px",
              }}
            ></div>
          </div>

          <Button
            onClick={() => updateImage()}
            sx={{
              display: "flex",
              justifyContent: "center",
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "1rem",
            }}
            variant="contained"
          >
            Update Image
          </Button>
        </div>
      </Dialog>
      <Toaster />
    </>
  );
};

export default UpdateSubProductImage;
