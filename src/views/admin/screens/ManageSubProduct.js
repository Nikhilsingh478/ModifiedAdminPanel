import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSubProductList } from "../../../redux/actions/admin/adminProductAction";
import AddSubProd from "../components/AddSubProd";
import Pagination from "../../Pagination";
import AppLogout from "../../../AppLogout";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UpdateSubProd from "../components/UpdateSubProd";
import UpdateSubProductImage from "../components/UpdateSubProductImage";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ManageSubProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams("");
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [subProductID, setSubProductID] = useState("");

  const [subProductName, setSubProductName] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [gst, setGst] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [MRP, setMRP] = useState("");
  const [productID, setProductID] = useState("");

  const [openUpdateImgDial, setOpenUpdateImgDial] = useState(false);
  const [upPhotoOne, setUpPhotoOne] = useState("");
  const [upPhotoTwo, setUpPhotoTwo] = useState("");
  const [upImageId, setUpImageId] = useState("");

  //sub product list state
  const adminGetSubProdState = useSelector((state) => state.subProductList);
  const { loading, adminSubProd } = adminGetSubProdState;

  // console.log(adminSubProd);
  //add sub product state
  const addSubProductState = useSelector((state) => state.addSubProduct);
  const { success } = addSubProductState;

  //update sub prod state
  const updateSubProdState = useSelector((state) => state.updateSubProduct);
  const { updateSuccess } = updateSubProdState;

  // updateSubProdImg state
  const updateSubProdImgState = useSelector((state) => state.updateSubProdImg);
  const { updateImgSuccess } = updateSubProdImgState;

  //open model to set the current click product id
  const openModel = (
    subprodID,
    subProdName,
    buyPrice,
    sellPrice,
    gst,
    discount,
    m,
    prodID
  ) => {
    setOpen(true);
    setSubProductID(subprodID);
    setSubProductName(subProdName);
    setBuyingPrice(buyPrice);
    setSellingPrice(sellPrice);
    setGst(gst);
    setDiscountPercent(discount);
    setMRP(m);
    setProductID(prodID);
  };

  //open update image dial box
  const openUpdateImgModel = (photo1, photo2, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhotoOne(photo1);
    setUpPhotoTwo(photo2);
  };

  useEffect(() => {
    dispatch(adminSubProductList(id, page));
  }, [dispatch, id, page, success, updateSuccess, updateImgSuccess]);

  return (
    <>
      <AppLogout>
        <div className="dashboar-section">
          <div className="sidebar-div">
            <Sidebar />
          </div>

          <div
            style={{
              marginLeft: "16%",
            }}
          >
            <AddSubProd />

            <TableContainer
              component={Paper}
              style={{
                margin: "1rem",
              }}
              sx={{ maxHeight: "680px", maxWidth: "98%" }}
            >
              <Table
                style={{
                  width: "95%",
                }}
                stickyHeader
                aria-label="sticky table"
              >
                <div className="loading-style">
                  {loading && (
                    <>
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    </>
                  )}
                </div>
                <TableHead>
                  <TableRow>
                    <TableCell size="small">#id</TableCell>
                    <TableCell width="15%">images</TableCell>
                    <TableCell size="small">Name</TableCell>
                    <TableCell>Buying price</TableCell>
                    <TableCell>Selling price</TableCell>
                    <TableCell>MRP</TableCell>
                    <TableCell>Total buying price(with gst) </TableCell>
                    <TableCell>Total selling price(with gst) </TableCell>
                    <TableCell>GST(%)</TableCell>
                    <TableCell>Discount(%)</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminSubProd &&
                    adminSubProd.map((cur, ind) => {
                      return (
                        <>
                          <TableRow
                            hover
                            key={ind}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{ind + 1}</TableCell>

                            <TableCell
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    border: "1px solid #e6e6e6",
                                    width: "95%",
                                    height: "70px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={cur.imagePathOne}
                                    alt={`${cur.subProduct.subProductName} first`}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      margin: "8px",
                                    }}
                                  />

                                  <img
                                    src={cur.imagePathTwo}
                                    alt={`${cur.subProduct.subProductName} second`}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                    }}
                                  />
                                </div>
                                <VisibilityIcon
                                  onClick={() =>
                                    openUpdateImgModel(
                                      cur.imagePathOne,
                                      cur.imagePathTwo,
                                      cur.id
                                    )
                                  }
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "6px",
                                    marginLeft: "10%",
                                  }}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              {cur.subProduct.subProductName}
                            </TableCell>

                            <TableCell>
                              {cur.subProduct.buyingPrice} ₹
                            </TableCell>

                            <TableCell>
                              {cur.subProduct.sellingPrice} ₹
                            </TableCell>

                            <TableCell> {cur.subProduct.mrp} ₹</TableCell>

                            <TableCell>
                              {cur.subProduct.totalBuyingPrice} ₹
                            </TableCell>
                            <TableCell>
                              {cur.subProduct.totalSellingPrice} ₹
                            </TableCell>
                            <TableCell>{cur.subProduct.gst}%</TableCell>
                            <TableCell>
                              {cur.subProduct.discountPercent}%
                            </TableCell>

                            {/* {cur.subProduct.isActive === 1
                              ? "Active"
                              : "Deactive"} */}
                            <TableCell>
                              <IconButton aria-label="edit" color="primary">
                                <ModeEditIcon
                                  onClick={() =>
                                    openModel(
                                      cur.subProduct.id,
                                      cur.subProduct.subProductName,
                                      cur.subProduct.buyingPrice,
                                      cur.subProduct.sellingPrice,
                                      cur.subProduct.gst,
                                      cur.subProduct.discountPercent,
                                      cur.subProduct.mrp,
                                      cur.subProduct.product.id
                                    )
                                  }
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <UpdateSubProd
              open={open}
              setOpen={setOpen}
              subProductID={subProductID}
              subProductName={subProductName}
              setSubProductName={setSubProductName}
              buyingPrice={buyingPrice}
              setBuyingPrice={setBuyingPrice}
              sellingPrice={sellingPrice}
              setSellingPrice={setSellingPrice}
              gst={gst}
              setGst={setGst}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              MRP={MRP}
              setMRP={setMRP}
              productID={productID}
              setProductID={setProductID}
            />

            <UpdateSubProductImage
              openUpdateImgDial={openUpdateImgDial}
              setOpenUpdateImgDial={setOpenUpdateImgDial}
              photoOne={upPhotoOne}
              photoTwo={upPhotoTwo}
              upImageId={upImageId}
            />
            <Pagination page={page} setPage={(page) => setPage(page)} />
          </div>
        </div>
      </AppLogout>
    </>
  );
};

export default ManageSubProduct;
