import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminSubProductList } from "../../../redux/actions/admin/adminProductAction";
import AddSubProd from "../components/AddSubProd";
import Pagination from "../../Pagination";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import UpdateSubProd from "../components/UpdateSubProd";
import UpdateSubProductImage from "../components/UpdateSubProductImage";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";

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

  //add sub product state
  const addSubProductState = useSelector((state) => state.addSubProduct);
  const { success } = addSubProductState;

  //update sub prod state
  const updateSubProdState = useSelector((state) => state.updateSubProduct);
  const { updateSuccess } = updateSubProdState;

  // updateSubProdImg state
  const updateSubProdImgState = useSelector((state) => state.updateSubProdImg);
  const { updateImgSuccess } = updateSubProdImgState;

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

  const openUpdateImgModel = (photo1, photo2, id) => {
    setUpImageId(id);
    setOpenUpdateImgDial(true);
    setUpPhotoOne(photo1);
    setUpPhotoTwo(photo2);
  };

  useEffect(() => {
    dispatch(adminSubProductList(id, page));
  }, [dispatch, id, page, success, updateSuccess, updateImgSuccess]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Images", field: "images" },
    { label: "Name", field: "name" },
    { label: "Buying price", field: "buyingPrice" },
    { label: "Selling price", field: "sellingPrice" },
    { label: "MRP", field: "mrp" },
    { label: "Total buying price(with gst)", field: "totalBuyingPrice" },
    { label: "Total selling price(with gst)", field: "totalSellingPrice" },
    { label: "GST(%)", field: "gst" },
    { label: "Discount(%)", field: "discount" },
    { label: "Action", field: "action" },
  ];

  return (
    <Layout>
      <PageHeader title="Manage Sub Products" actionButton={<AddSubProd />} />
      <DataTable
        columns={columns}
        data={adminSubProd || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "images") return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ border: "1px solid #e6e6e6", width: "95px", height: "70px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={row.imagePathOne} alt="first" style={{ width: "40px", height: "40px", margin: "4px" }} />
                <img src={row.imagePathTwo} alt="second" style={{ width: "40px", height: "40px", margin: "4px" }} />
              </div>
              <VisibilityIcon
                onClick={() => openUpdateImgModel(row.imagePathOne, row.imagePathTwo, row.id)}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "6px", marginLeft: "10%", cursor: "pointer" }}
              />
            </div>
          );
          if (col.field === "name") return row.subProduct.subProductName;
          if (col.field === "buyingPrice") return `${row.subProduct.buyingPrice} ₹`;
          if (col.field === "sellingPrice") return `${row.subProduct.sellingPrice} ₹`;
          if (col.field === "mrp") return `${row.subProduct.mrp} ₹`;
          if (col.field === "totalBuyingPrice") return `${row.subProduct.totalBuyingPrice} ₹`;
          if (col.field === "totalSellingPrice") return `${row.subProduct.totalSellingPrice} ₹`;
          if (col.field === "gst") return `${row.subProduct.gst}%`;
          if (col.field === "discount") return `${row.subProduct.discountPercent}%`;
          if (col.field === "action") return (
            <IconButton aria-label="edit" sx={{ color: '#A7F3D0' }}>
              <ModeEditIcon onClick={() => openModel(
                row.subProduct.id, row.subProduct.subProductName, row.subProduct.buyingPrice,
                row.subProduct.sellingPrice, row.subProduct.gst, row.subProduct.discountPercent,
                row.subProduct.mrp, row.subProduct.product.id
              )} />
            </IconButton>
          );
          return row[col.field];
        }}
      />

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
    </Layout>
  );
};

export default ManageSubProduct;
