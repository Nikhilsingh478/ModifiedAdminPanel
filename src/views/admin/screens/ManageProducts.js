import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { adminProductList } from "../../../redux/actions/admin/adminProductAction";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Pagination from "../../Pagination";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProd from "../components/UpdateProd";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UpdateProdImage from "../components/UpdateProdImage";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";

const ManageProducts = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [brandID, setBrandID] = useState("");
  const [keywordID, setkeywordID] = useState("");
  const [HSNCodeID, setHSNCodeID] = useState("");
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
  const { updateImgSuccess } = updateProdImgState;

  const openModel = (prodID, prodName, brand, keyID, hsnID) => {
    setOpen(true);
    setProductId(prodID);
    setProductName(prodName);
    setBrandID(brand);
    setkeywordID(keyID);
    setHSNCodeID(hsnID);
  };

  const openUpdateImgModel = (photo, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhoto(photo);
  };

  useEffect(() => {
    dispatch(adminProductList(id, page));
  }, [dispatch, id, page, success, updateSuccess, updateImgSuccess]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Image", field: "image" },
    { label: "Product Name", field: "productName" },
    { label: "Subcategory Name", field: "subCategoryName" },
    { label: "Brand Name", field: "brandName" },
    { label: "Action", field: "action" },
    { label: "Expands", field: "expands" },
  ];

  return (
    <Layout>
      <PageHeader title="Manage Products" actionButton={<AddProduct />} />
      <DataTable
        columns={columns}
        data={adminProd || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "image") return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img
                src={row.imagePath}
                alt={row.product.productName}
                style={{ width: "50px", height: "50px", cursor: "pointer" }}
                onClick={() => history.push(`/admin/manage_subproducts/${row.product.id}`)}
              />
              <VisibilityIcon
                onClick={() => openUpdateImgModel(row.imagePath, row.id)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6px", marginLeft: "10%", cursor: "pointer" }}
              />
            </div>
          );
          if (col.field === "productName") return (
            <div onClick={() => history.push(`/admin/manage_subproducts/${row.product.id}`)} style={{ cursor: "pointer" }}>
              {row.product.productName}
            </div>
          );
          if (col.field === "subCategoryName") return (
            <div onClick={() => history.push(`/admin/manage_subproducts/${row.product.id}`)} style={{ cursor: "pointer" }}>
              {row.product.subCategory.subCategoryName}
            </div>
          );
          if (col.field === "brandName") return row.product.brand.brandName;
          if (col.field === "action") return (
            <IconButton aria-label="edit" sx={{ color: '#A7F3D0' }}>
              <EditIcon onClick={() => openModel(row.product.id, row.product.productName, row.product.brand.id, row.product.keyword.id, row.product.hsn.id)} />
            </IconButton>
          );
          if (col.field === "expands") return (
            <div onClick={() => history.push(`/admin/manage_subproducts/${row.product.id}`)} style={{ cursor: "pointer", textAlign: "center" }}>
              <ArrowForwardIosIcon />
            </div>
          );
          return row[col.field];
        }}
      />

      <UpdateProd
        open={open}
        setOpen={setOpen}
        prodID={productId}
        productName={productName}
        setProductName={setProductName}
        subCateID={subCateID}
        setsubCateID={setsubCateID}
        brandID={brandID}
        setBrandID={setBrandID}
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
    </Layout>
  );
};

export default ManageProducts;
