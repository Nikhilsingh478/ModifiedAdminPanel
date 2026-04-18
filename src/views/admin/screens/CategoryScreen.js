import React, { useState, useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import AddCategory from "../components/AddCategory";
import { categoryList } from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import EditIcon from "@mui/icons-material/Edit";
import UpdateCategory from "../components/UpdateCategory";
import { formatDate } from "../../../helper/FormatDateTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CategoryImageUpdate from "../components/CategoryImageUpdate";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

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

  const columns = [
    { label: "#id", field: "id" },
    { label: "image", field: "image" },
    { label: "Category Name", field: "categoryName" },
    { label: "Status", field: "status" },
    { label: "Date Added", field: "createdDateTime" },
    { label: "Action", field: "action" },
    { label: "Expands", field: "expands" },
  ];

  return (
    <Layout>
      <PageHeader 
        title="Category List" 
        actionButton={<AddCategory />} 
      />

      <DataTable
        columns={columns}
        data={category || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "image") return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <img
                src={row.imagePath}
                alt={row.primaryCategory.primaryCategoryName}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={() => history.push(`/admin/category/${row.primaryCategory.id}`)}
              />
              <VisibilityIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "6px",
                  marginLeft: "10%",
                  cursor: "pointer"
                }}
                onClick={() => openUpdateImgModel(row.imagePath, row.id)}
              />
            </div>
          );
          if (col.field === "categoryName") return (
            <div onClick={() => history.push(`/admin/category/${row.primaryCategory.id}`)} style={{ cursor: "pointer" }}>
              {row.primaryCategory.primaryCategoryName}
            </div>
          );
          if (col.field === "status") return (
            <StatusBadge status={row.isActive === 1 ? "Active" : "Deactive"} />
          );
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          if (col.field === "action") return (
            <IconButton aria-label="edit" color="primary">
              <EditIcon
                onClick={() => openModel(row.primaryCategory.id, row.primaryCategory.primaryCategoryName)}
              />
            </IconButton>
          );
          if (col.field === "expands") return (
            <div onClick={() => history.push(`/admin/category/${row.primaryCategory.id}`)} style={{ cursor: "pointer" }}>
              <ArrowForwardIosIcon />
            </div>
          );
          return row[col.field];
        }}
      />

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
    </Layout>
  );
};

export default CategoryScreen;
