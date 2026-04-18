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
import { useHistory, useParams } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { adminProductList } from "../../../redux/actions/admin/adminProductAction";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import AppLogout from "../../../AppLogout";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProd from "../components/UpdateProd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateProdImage from "../components/UpdateProdImage";


const ManageProducts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [brandID, setBrandID] = useState("")
  const [keywordID, setkeywordID] = useState("");
  const [HSNCodeID, setHSNCodeID] = useState("")
  const [openUpdateImgDial, setOpenUpdateImgDial] = useState(false);
  const [upPhoto, setUpPhoto] = useState("");
  const [upImageId, setUpImageId] = useState("");
  
  const [subCateID, setsubCateID] = useState(id);

  //product list state
  const adminGetProdState = useSelector((state) => state.adminProdList);
  const { loading, adminProd } = adminGetProdState;

  //add product state
  const addProductState = useSelector((state) => state.addProduct);
  const { success } = addProductState;

  //update prod state
  const updateProdState = useSelector((state) => state.updateProduct);
  const { updateSuccess } = updateProdState;

  //updateProdImg
  const updateProdImgState = useSelector((state) => state.updateProdImg);
  const {  updateImgSuccess} = updateProdImgState;

  //open model to set the current click product id
  const openModel = (prodID, prodName,brand,keyID,hsnID) => {
    setOpen(true);
    setProductId(prodID);
    setProductName(prodName);
    setBrandID(brand);
    setkeywordID(keyID);
    setHSNCodeID(hsnID);
  };

   //open update image dial box
  const openUpdateImgModel = (photo, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhoto(photo);
  };

  //load the list
  useEffect(() => {
    dispatch(adminProductList(id, page));
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
            <AddProduct />

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
                    <TableCell>image</TableCell>
                    <TableCell size="small">productName</TableCell>
                    <TableCell>subCategoryName</TableCell>
                    <TableCell>BrandName</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Expands</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminProd &&
                    adminProd.map((cur, ind) => {
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

                            <TableCell  style={{
                                cursor: "pointer",
                              }}
                              // onClick={() =>
                              //   history.push(
                              //     `/admin/manage_subproducts/${cur.product.id}`
                              //   )}
                                >
                                <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                }}
                              >
                              <img
                                src={cur.imagePath}
                                alt={cur.product.productName}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                                onClick={() =>
                                history.push(
                                  `/admin/manage_subproducts/${cur.product.id}`
                                )
                              }
                              />

                                <VisibilityIcon
                                  onClick={() =>
                                    openUpdateImgModel(cur.imagePath, cur.id)
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
                            <TableCell
                               onClick={() =>
                                history.push(
                                  `/admin/manage_subproducts/${cur.product.id}`
                                )
                              }
                            >{cur.product.productName}</TableCell>

                            <TableCell
                               onClick={() =>
                                history.push(
                                  `/admin/manage_subproducts/${cur.product.id}`
                                )
                              }
                            >
                              {cur.product.subCategory.subCategoryName}
                            </TableCell>
                            <TableCell>{cur.product.brand.brandName}</TableCell>
                            <TableCell>
                              <IconButton aria-label="edit" color="primary">
                                <EditIcon
                                  onClick={() =>
                                    openModel(
                                      cur.product.id,
                                      cur.product.productName,
                                      cur.product.brand.id,
                                      cur.product.keyword.id,
                                      cur.product.hsn.id
                                    )
                                  }
                                />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                history.push(
                                  `/admin/manage_subproducts/${cur.product.id}`
                                )
                              }
                            >
                              <ArrowForwardIosIcon />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <UpdateProd
              open={open}
              setOpen={setOpen}
              prodID={productId}
              productName={productName}
              setProductName={setProductName}
              subCateID={subCateID}
              setsubCateID={setsubCateID}
              brandID = {brandID}
              setBrandID={setBrandID }
              keywordID={keywordID}
              setkeywordID={setkeywordID}
              HSNCodeID={HSNCodeID}
              setHSNCodeID={setHSNCodeID}
            />

            <UpdateProdImage
              openUpdateImgDial={openUpdateImgDial}
              setOpenUpdateImgDial={setOpenUpdateImgDial}
              photo={upPhoto}
              upImageId={upImageId}
            />

            <Pagination page={page} setPage={(page) => setPage(page)} />

          </div>
        </div>
      </AppLogout>
    </>
  );
};

export default ManageProducts;
