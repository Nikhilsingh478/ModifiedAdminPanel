import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetailShow } from "../../../redux/actions/admin/adminOrderAction";
import { formatDate } from "../../../helper/FormatDateTime";
import "./OrderDetailScreen.css";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import Card from "../../../components/common/Card";

const OrderDetailScreen = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams("");
  const { status, date } = props.location.state;
  const orderDetailsState = useSelector((state) => state.orderDetail);
  const { loading, orderDetails } = orderDetailsState;

  useEffect(() => {
    dispatch(orderDetailShow(id));
  }, [dispatch, id]);

  const columns = [
    { label: "Image", field: "image" },
    { label: "Name", field: "name" },
    { label: "QTY", field: "qty" },
    { label: "MRP", field: "mrp" },
    { label: "Selling price(without gst)", field: "sellingPrice" },
    { label: "GST(%)", field: "gst" },
    { label: "Total price", field: "totalPrice" },
  ];

  return (
    <Layout>
      <PageHeader title="Order Details" />
      
      <div className="detail d-flex justify-content-between" style={{ marginBottom: "20px" }}>
        <div className="invoice-div">
          <h2>INVOICE</h2>
          <p>STATUS: <span>{status}</span></p>
          <p>DATE - <span className="date">{formatDate(date)}</span></p>
        </div>
        <div className="address-details" style={{ textAlign: "right" }}>
          <h2>{orderDetails && orderDetails.details.name}</h2>
          <div className="address-div">
            <p>
              {orderDetails &&
                `${orderDetails.details.addressLineOne} , ${orderDetails.details.city}, ${orderDetails.details.state}, ${orderDetails.details.pinCode}`}
            </p>
          </div>
          <p>Mobile no - <span>{orderDetails && orderDetails.details.mobileNumber}</span></p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={orderDetails ? orderDetails.orderItemsList : []}
        loading={loading}
        renderCell={(row, col) => {
          if (col.field === "image") return (
            <img src={row.imagePathOne} alt={row.subProductName} style={{ width: "50px", height: "50px" }} />
          );
          if (col.field === "name") return <Typography>{row.subProductName}</Typography>;
          if (col.field === "qty") return <Typography>{row.quantity}</Typography>;
          if (col.field === "mrp") return row.mrp;
          if (col.field === "sellingPrice") return <Typography>{row.sellingPricePerUnit}</Typography>;
          if (col.field === "gst") return <Typography>{row.gst}</Typography>;
          if (col.field === "totalPrice") return (
            <Typography>
              {Math.round(row.totalSellingPricePerUnit * row.quantity * 100) / 100}
            </Typography>
          );
          return row[col.field];
        }}
      />

      <Card sx={{ mt: 3, p: 3, display: 'flex', justifyContent: 'space-between', borderRadius: "6px" }} className="amount-detail shadow">
        <div>
          <h2 className="amount-heading">Base Amount</h2>
          <p className="amount-rs">₹ {orderDetails && Math.round(orderDetails.details.baseAmount * 100) / 100}</p>
        </div>
        <div>
          <h2 className="amount-heading">GST Charges</h2>
          <p className="amount-rs">₹ {orderDetails && Math.round(orderDetails.details.gstCharges)}</p>
        </div>
        <div>
          <h2 className="amount-heading">Handling Fee</h2>
          <p className="amount-rs">₹ {orderDetails && orderDetails.details.handlingFee}</p>
        </div>
        <div>
          <h2 className="amount-heading">Total Amount</h2>
          <p className="final-rs">₹ {orderDetails && Math.round(orderDetails.details.totalAmount * 100) / 100}</p>
        </div>
      </Card>
    </Layout>
  );
};

export default OrderDetailScreen;
