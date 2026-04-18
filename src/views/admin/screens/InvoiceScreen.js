import React, { useEffect, useRef } from "react";
import { Box, Paper, CircularProgress, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailShow } from "../../../redux/actions/admin/adminOrderAction";
import { formatDate } from "../../../helper/FormatDateTime";
import { useReactToPrint } from "react-to-print";
import "./InvoiceScreen.css";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";

const InvoiceScreen = (props) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const { id } = useParams("");
  const { date } = props.location.state;
  
  const orderDetailsState = useSelector((state) => state.orderDetail);
  const { loading, orderDetails } = orderDetailsState;
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(orderDetailShow(id));
  }, [dispatch, id]);

  const columns = [
    { label: "Sr no", field: "id" },
    { label: "Product Name", field: "name" },
    { label: "HSN", field: "hsn" },
    { label: "MRP", field: "mrp" },
    { label: "QTY", field: "qty" },
    { label: "Rate(Without GST)", field: "rateWithout" },
    { label: "Rate(With GST)", field: "rateWith" },
    { label: "GST(%)", field: "gst" },
    { label: "Amount", field: "amount" },
  ];

  return (
    <Layout>
      <PageHeader title="Invoice" actionButton={
        <Button size="small" variant="outlined" onClick={handlePrint}>
          Print Invoice
        </Button>
      } />

      <Paper sx={{ width: "100%", overflow: "hidden", minHeight: "90vh", p: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75vh" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className="invoice-screen" ref={componentRef} sx={{ p: 2 }}>
            <div className="profee-logo">
              <Box>
                <img src="./images/logo.svg" alt="logo" />
              </Box>
            </div>

            <div className="bill-heading d-flex justify-content-between mt-5">
              <div className="bill-left-part">
                <p><strong>Profee GST - </strong><span>{orderDetails && orderDetails.details.gstNumber}</span></p>
                <p><strong>Email - </strong><span>profeeworld@gmail.com</span></p>
                <p><strong>Phone No -</strong> <span>9561172681</span></p>
                <p><strong>Date -</strong> <span>{date ? formatDate(date) : null}</span></p>
              </div>

              <div className="bill-right-part">
                <p><strong>Shop Name - </strong><span>{orderDetails && orderDetails.details.shopName}</span></p>
                <p><strong>Name -</strong><span>{orderDetails && orderDetails.details.name}</span></p>
                <p><strong>GST - </strong><span>{orderDetails && orderDetails.details.customerGSTNumber}</span></p>
                <p><strong>Mobile No - </strong><span>{orderDetails && orderDetails.details.mobileNumber}</span></p>
                <p>
                  <strong>Address - </strong>
                  <span>{orderDetails && orderDetails.details.addressLineOne}</span>
                  <br />
                  <span style={{ lineHeight: "2" }}>
                    {orderDetails && `${orderDetails.details.city}, ${orderDetails.details.state}, ${orderDetails.details.pinCode}`}
                  </span>
                </p>
              </div>
            </div>

            <hr style={{ marginTop: "-1px", color: "#000000" }} />

            <DataTable
              columns={columns}
              data={orderDetails ? orderDetails.orderItemsList : []}
              loading={loading}
              renderCell={(row, col, rowIndex) => {
                if (col.field === "id") return rowIndex + 1;
                if (col.field === "name") return <p className="product-content">{row.subProductName}</p>;
                if (col.field === "hsn") return <p className="product-content">{row.hsnNumber}</p>;
                if (col.field === "mrp") return <p className="product-content">{row.mrp}</p>;
                if (col.field === "qty") return <p className="product-content">{row.quantity}</p>;
                if (col.field === "rateWithout") return <p className="product-content">{row.sellingPricePerUnit}</p>;
                if (col.field === "rateWith") return <p className="product-content">{Math.round(row.totalSellingPricePerUnit * 100) / 100}</p>;
                if (col.field === "gst") return <p className="product-content">{row.gst}</p>;
                if (col.field === "amount") return <p className="product-content">{Math.round(row.totalSellingPricePerUnit * row.quantity * 100) / 100}</p>;
                return row[col.field];
              }}
            />

            <Box sx={{ maxWidth: "90%", marginRight: "auto", marginLeft: "auto", marginTop: "0.4rem", padding: "0.5rem", borderRadius: "10px" }}>
              <Box className="detail d-flex justify-content-between">
                <div>
                  <h5 className="amount-heading" style={{ fontSize: "16px" }}>Base Amount</h5>
                  <p className="amount-rs" style={{ fontSize: "15px" }}>₹{orderDetails && Math.round(orderDetails.details.baseAmount * 100) / 100}</p>
                </div>
                <div>
                  <h5 className="amount-heading" style={{ fontSize: "16px" }}>GST Charges</h5>
                  <p className="amount-rs" style={{ fontSize: "15px" }}>₹{orderDetails && Math.round(orderDetails.details.gstCharges * 100) / 100}</p>
                </div>
                <div>
                  <h5 className="amount-heading" style={{ fontSize: "16px" }}>Handling Fee</h5>
                  <p className="amount-rs" style={{ fontSize: "15px" }}>₹ {orderDetails && orderDetails.details.handlingFee}</p>
                </div>
                <div>
                  <h5 className="amount-heading" style={{ fontSize: "16px" }}>Total Amount</h5>
                  <p className="final-rs" style={{ fontSize: "15px" }}>₹{orderDetails && Math.round(orderDetails.details.totalAmount * 100) / 100}</p>
                </div>
              </Box>
            </Box>

            <Box>
              <hr style={{ marginTop: "-1px", color: "#000000" }} />
              <div className="bottom-side-bill d-flex justify-content-between mt-3">
                <div className="bottom-left-side">
                  <p className="bank-line"><strong>Bank Detail - </strong><span>{orderDetails && orderDetails.details.bankName}</span></p>
                  <p className="bank-line"><strong>Account Name -</strong><span> {orderDetails && orderDetails.details.accountName}</span></p>
                  <p className="bank-line"><strong>Account No - </strong><span> {orderDetails && orderDetails.details.accountNumber}</span></p>
                  <p className="bank-line"><strong>IFSC Code - </strong><span> {orderDetails && orderDetails.details.ifscCode}</span></p>
                </div>

                <div className="bottom-right-side">
                  <p className="bank-line"><strong>Note -</strong></p>
                  <p className="bank-line">1. CHEQUE RETURN CHARGES 600RS</p>
                  <p>2. PLEASE CHECK THE GOODS THOROUGHLY BEFORE TAKING THEM.</p>
                </div>
              </div>
            </Box>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default InvoiceScreen;
