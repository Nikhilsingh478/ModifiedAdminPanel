import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Toaster } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import { subCategoryList } from "../../../redux/actions/admin/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AddSubCategory from "../components/AddSubCategory";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import UpdateSubCate from "../components/UpdateSubCate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateSubCateImage from "../components/UpdateSubCateImage";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

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

  const openModel = (subID, name, keyId) => {
    setOpen(true);
    setSubCategoryID(subID);
    setSubCategoryName(name);
    setSelectedKeyWID(keyId);
  };

  const openUpdateImgModel = (photo, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhoto(photo);
  };

  useEffect(() => {
    dispatch(subCategoryList(id, page));
  }, [dispatch, id, page, success, updateSuccess, updateImgSuccess]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Image", field: "image" },
    { label: "SubCategory Name", field: "subCategoryName" },
    { label: "Category", field: "category" },
    { label: "Date Added", field: "createdDateTime" },
    { label: "Status", field: "status" },
    { label: "Action", field: "action" },
    { label: "Expands", field: "expands" },
  ];

  return (
    <Layout>
      <PageHeader title="Subcategory List" actionButton={<AddSubCategory />} />
      <DataTable
        columns={columns}
        data={subCategory || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "image") return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img
                src={row.imagePath}
                alt={row.subCategory.subCategoryName}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={() => history.push(`/admin/manage_products/${row.subCategory.id}`)}
              />
              <VisibilityIcon
                onClick={() => openUpdateImgModel(row.imagePath, row.id)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6px", marginLeft: "10%", cursor: "pointer" }}
              />
            </div>
          );
          if (col.field === "subCategoryName") return (
            <div onClick={() => history.push(`/admin/manage_products/${row.subCategory.id}`)} style={{ cursor: "pointer" }}>
              {row.subCategory.subCategoryName}
            </div>
          );
          if (col.field === "category") return (
            <div onClick={() => history.push(`/admin/manage_products/${row.subCategory.id}`)} style={{ cursor: "pointer" }}>
              {row.subCategory.primaryCategory.primaryCategoryName}
            </div>
          );
          if (col.field === "createdDateTime") return formatDate(row.createdDateTime);
          if (col.field === "status") return <StatusBadge status={row.isActive === 1 ? "Active" : "Deactive"} />;
          if (col.field === "action") return (
            <IconButton aria-label="edit" sx={{ color: '#A7F3D0' }}>
              <EditIcon onClick={() => openModel(row.subCategory.id, row.subCategory.subCategoryName, row.subCategory.keyword.id)} />
            </IconButton>
          );
          if (col.field === "expands") return (
            <div onClick={() => history.push(`/admin/manage_products/${row.subCategory.id}`)} style={{ cursor: "pointer", textAlign: "center" }}>
              <ArrowForwardIosIcon />
            </div>
          );
          return row[col.field];
        }}
      />

      <UpdateSubCate
        open={open}
        setOpen={setOpen}
        subCategoryID={subCategoryID}
        id={id}
        subCategoryName={subCategoryName}
        setSubCategoryName={setSubCategoryName}
        selectedKeyWID={selectedKeyWID}
        setSelectedKeyWID={setSelectedKeyWID}
        setcategoryID={setcategoryID}
        categoryID={categoryID}
      />

      <UpdateSubCateImage
        openUpdateImgDial={openUpdateImgDial}
        setOpenUpdateImgDial={setOpenUpdateImgDial}
        photo={upPhoto}
        upImageId={upImageId}
      />

      <Pagination page={page} setPage={(page) => setPage(page)} />
      <Toaster />
    </Layout>
  );
};

export default SubcategoryScreen;
