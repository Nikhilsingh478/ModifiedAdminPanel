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
import EditIcon from "@mui/icons-material/Edit";
import { subCategoryList } from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AddSubCategory from "../components/AddSubCategory";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import AppLogout from "../../../AppLogout";
import UpdateSubCate from "../components/UpdateSubCate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateSubCateImage from "../components/UpdateSubCateImage";

const SubcategoryScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [subCategoryID, setSubCategoryID] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedKeyWID, setSelectedKeyWID] = useState("");
  const [openUpdateImgDial, setOpenUpdateImgDial] = useState(false);
  const [upPhoto, setUpPhoto] = useState("");
  const [upImageId, setUpImageId] = useState("");

  const [categoryID, setcategoryID] = useState(id);

  //load sub category
  const subCategoryState = useSelector((state) => state.subCategoryList);
  const { loading, subCategory } = subCategoryState;

  //sub category adding result
  const addSubCategoryState = useSelector((state) => state.addSubCategory);
  const { success } = addSubCategoryState;

  //update primary cate state
  const updateSubCateState = useSelector((state) => state.updateSubCategory);
  const { updateSuccess } = updateSubCateState;

  // updateSubCateImg state
  const updateSubCateImgState = useSelector((state) => state.updateSubCateImg);
  const { updateImgSuccess } = updateSubCateImgState;

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  //set the id
  const openModel = (subID, name, keyId) => {
    setOpen(true);
    setSubCategoryID(subID);
    setSubCategoryName(name);
    setSelectedKeyWID(keyId);
    // setSelectedKeyWID(keyId);
    // setSelectedKeyW(keyWName);

  };

  //open update image dial box
  const openUpdateImgModel = (photo, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhoto(photo);
  };


  useEffect(() => {
    dispatch(subCategoryList(id, page));
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
            <AddSubCategory />

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
                aria-label="a dense table"
                stickyHeader
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
                    <TableCell size="small">Image</TableCell>
                    <TableCell>SubCategory Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date Added</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell size="small">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subCategory &&
                    subCategory.map((cur, ind) => {
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
                              // onClick={() =>
                              //   history.push(
                              //     `/admin/manage_products/${cur.subCategory.id}`
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
                                  alt={cur.subCategory.subCategoryName}
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                  onClick={() =>
                                  history.push(
                                    `/admin/manage_products/${cur.subCategory.id}`
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
                                  `/admin/manage_products/${cur.subCategory.id}`
                                )
                              }>
                              {cur.subCategory.subCategoryName}
                            </TableCell>
                            <TableCell
                              onClick={() =>
                                history.push(
                                  `/admin/manage_products/${cur.subCategory.id}`
                                )
                              }
                            >
                              {
                                cur.subCategory.primaryCategory
                                  .primaryCategoryName
                              }
                            </TableCell>

                            <TableCell>
                              {formatDate(cur.createdDateTime)}
                            </TableCell>
                            <TableCell>
                              {cur.isActive === 1 ? "Active" : "Deactive"}
                            </TableCell>

                            <TableCell>
                              <IconButton aria-label="edit" color="primary">
                                <EditIcon
                                  onClick={() =>
                                    openModel(
                                      cur.subCategory.id,
                                      cur.subCategory.subCategoryName,
                                      cur.subCategory.keyword.id,
                                      // cur.subCategory.keyword.keywords
                                    )
                                  }
                                />
                              </IconButton>
                              {/* 
                              <IconButton aria-label="delete" color="error">
                                <DeleteIcon />
                              </IconButton> */}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                history.push(
                                  `/admin/manage_products/${cur.subCategory.id}`
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

            <UpdateSubCate
              open={open}
              setOpen={setOpen}
              subCategoryID={subCategoryID}
              id={id}
              subCategoryName={subCategoryName}
              setSubCategoryName={setSubCategoryName}
              // selectedKeyWID={selectedKeyWID}
              // setSelectedKeyWID={setSelectedKeyWID}
              // selectedKeyW={selectedKeyW}
              // setSelectedKeyW={setSelectedKeyW}
              selectedKeyWID={selectedKeyWID}
              setSelectedKeyWID={setSelectedKeyWID}
              setcategoryID={setcategoryID}
              categoryID= {categoryID}
            />

            <UpdateSubCateImage
              openUpdateImgDial={openUpdateImgDial}
              setOpenUpdateImgDial={setOpenUpdateImgDial}
              photo={upPhoto}
              upImageId={upImageId}
            />

            <Pagination page={page} setPage={(page) => setPage(page)} />
          </div>
        </div>
        <Toaster />
      </AppLogout>
    </>
  );
};

export default SubcategoryScreen;
