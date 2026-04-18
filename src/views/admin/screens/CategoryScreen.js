import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import AddCategory from "../components/AddCategory";
import { categoryList } from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import AppLogout from "../../../AppLogout";
import EditIcon from "@mui/icons-material/Edit";
import UpdateCategory from "../components/UpdateCategory";
import { formatDate } from "../../../helper/FormatDateTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CategoryImageUpdate from "../components/CategoryImageUpdate";

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [updateCategoryId, setUpdateCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [openUpdateImgDial, setOpenUpdateImgDial] = useState(false);
  const [upPhoto, setUpPhoto] = useState("");
  const [upImageId, setUpImageId] = useState("");

  //category load state
  const categoryState = useSelector((state) => state.categoryList);
  const { loading, category } = categoryState;

  //add primary cate state
  const addPrimaryCateState = useSelector((state) => state.addPrimaryCategory);
  const { success } = addPrimaryCateState;

  //update primary cate state
  const updatePrimaryCateState = useSelector(
    (state) => state.updatePrimaryCategory
  );
  const { updateSuccess } = updatePrimaryCateState;

  //update primary cate image state
  // updatePrimaryCateImg state
  const updatePrimaryCateImgState = useSelector(
    (state) => state.updatePrimaryCateImg
  );
  const { updateImgSuccess } = updatePrimaryCateImgState;

  const openModel = (id, name) => {
    setOpen(true);
    setUpdateCategoryId(id);
    setCategoryName(name);
  };

  //open update image dial box
  const openUpdateImgModel = (photo, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhoto(photo);
  };

  useEffect(() => {
    dispatch(categoryList(page));
  }, [page, success, updateSuccess, updateImgSuccess, dispatch]);

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
            <AddCategory />

            <TableContainer
              component={Paper}
              style={{
                margin: "1rem",
              }}
              sx={{ maxHeight: "680px", maxWidth: "98%" }}
            >
              <Table aria-label="a dense table" stickyHeader>
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
                    <TableCell size="small">image</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Added</TableCell>
                    <TableCell size="small">Action</TableCell>
                    <TableCell size="small">Expands</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category &&
                    category.map((cur, ind) => {
                      return (
                        <>
                          <TableRow
                            key={ind}
                            hover
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
                              //     `/admin/category/${cur.primaryCategory.id}`
                              //   )
                              // }
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
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                  }}
                                  onClick={() =>
                                history.push(
                                  `/admin/category/${cur.primaryCategory.id}`
                                )
                              }
                                />
                                <VisibilityIcon
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "6px",
                                    marginLeft: "10%",
                                  }}
                                  onClick={() =>
                                    openUpdateImgModel(cur.imagePath, cur.id)
                                  }
                                />
                              </div>
                            </TableCell>
                            <TableCell
                              onClick={() =>
                                history.push(
                                  `/admin/category/${cur.primaryCategory.id}`
                                )
                              }
                             >
                              {cur.primaryCategory.primaryCategoryName}
                              
                            </TableCell>

                            <TableCell>
                              <Typography>
                                {cur.isActive === 1 ? "Active" : "Deactive"}
                              </Typography>
                            </TableCell>

                            <TableCell>
                              {/* {cur.createdDateTime} */}
                              {formatDate(cur.createdDateTime)}
                            </TableCell>

                            <TableCell size="small">
                              <IconButton aria-label="edit" color="primary">
                                <EditIcon
                                  onClick={() =>
                                    openModel(
                                      cur.primaryCategory.id,
                                      cur.primaryCategory.primaryCategoryName
                                    )
                                  }
                                />
                              </IconButton>

                              {/* <IconButton aria-label="delete" color="error">
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
                                  `/admin/category/${cur.primaryCategory.id}`
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

            <UpdateCategory
              open={open}
              setOpen={setOpen}
              updateCategoryId={updateCategoryId}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
            />

            <CategoryImageUpdate
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

export default CategoryScreen;
