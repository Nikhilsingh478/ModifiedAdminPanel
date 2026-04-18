import React, { useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/material";
import AppLogout from "../../../AppLogout";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailShow } from "../../../redux/actions/admin/adminOrderAction";
import { formatDate } from "../../../helper/FormatDateTime";
import { useReactToPrint } from "react-to-print";
import "./InvoiceScreen.css";

const columns = [
  { id: "1", label: "Sr no", maxWidth: 20 },
  { id: "2", label: "Product Name", maxWidth: 250 },
  { id: "3", label: "HSN", maxWidth: 20 },
  { id: "8", label: "MRP", maxWidth: 20 },
  { id: "4", label: "QTY", maxWidth: 20 },
  { id: "5", label: "Rate(Without GST)", maxWidth: 20 },
  { id: "6", label: "Rate(With GST)", maxWidth: 20 },
  { id: "6", label: "GST(%)", maxWidth: 20 },
  { id: "7", label: "Amount", maxWidth: 20 },
];

const InvoiceScreen = (props) => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const { id } = useParams("");
  const { date } = props.location.state;
  //orders details state
  const orderDetailsState = useSelector((state) => state.orderDetail);
  const { loading, orderDetails } = orderDetailsState;
  console.log(orderDetails);

  //print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(orderDetailShow(id));
  }, [dispatch]);

  return (
    <>
      <AppLogout>
        <Box>
          <div className="sidebar-div">
            <Sidebar />
          </div>

          <div
            style={{
              marginLeft: "16%",
              marginTop: "-30px",
            }}
          >
            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <Paper
                sx={{ width: "100%", overflow: "hidden", minHeight: "90vh" }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ m: 2 }}
                  onClick={handlePrint}
                >
                  Print Invoice
                </Button>

                {loading ? (
                  <>
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "auto",
                          marginLeft: "auto",
                          height: "75vh",
                        }}
                      />
                    </Box>
                  </>
                ) : (
                  <Box className="invoice-screen" ref={componentRef}>
                    <Box>
                      <div className="profee-logo">
                        <Box>
                          <img src="./images/logo.svg" alt="logo" />
                        </Box>
                      </div>

                      <div className="bill-heading d-flex justify-content-between mt-5">
                        <div className="bill-left-part">
                          <p>
                            <strong>Profee GST - </strong>
                            <span>
                              {orderDetails && orderDetails.details.gstNumber}
                            </span>
                          </p>

                          <p>
                            <strong> Email - </strong>{" "}
                            <span>profeeworld@gmail.com</span>
                          </p>
                          <p>
                            <strong>Phone No -</strong> <span>9561172681</span>
                          </p>
                          <p>
                            <strong>Date -</strong>{" "}
                            <span>{date ? formatDate(date) : null}</span>
                          </p>
                        </div>

                        <div className="bill-right-part">
                          <p>
                            <strong>Shop Name - </strong>{" "}
                            <span>
                              {orderDetails && orderDetails.details.shopName}
                            </span>
                          </p>
                          <p>
                            <strong>Name -</strong>{" "}
                            <span>
                              {orderDetails && orderDetails.details.name}
                            </span>
                          </p>
                          <p>
                            <strong> GST - </strong>
                            <span>
                              {orderDetails &&
                                orderDetails.details.customerGSTNumber}
                            </span>
                          </p>
                          <p>
                            <strong> Mobile No - </strong>
                            <span>
                              {" "}
                              {orderDetails &&
                                orderDetails.details.mobileNumber}
                            </span>
                          </p>

                          <p>
                            <strong> Address - </strong>
                            <span>
                              {orderDetails &&
                                orderDetails.details.addressLineOne}
                            </span>
                            <br />
                            <span
                              style={{
                                lineHeight: "2",
                              }}
                            >
                              {orderDetails &&
                                `${orderDetails.details.city}, ${orderDetails.details.state}, ${orderDetails.details.pinCode}`}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Box>

                    <hr
                      style={{
                        marginTop: "-1px",
                        color: "#000000",
                      }}
                    />

                    <TableContainer>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                // style={{ maxWidth: column.maxWidth }}
                                width={column.maxWidth}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {orderDetails &&
                          orderDetails.orderItemsList.length > 0
                            ? orderDetails.orderItemsList.map((cur, ind) => {
                                return (
                                  <>
                                    <TableRow
                                      className="product-details"
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      // key={cur.product._id}
                                    >
                                      <TableCell>{ind + 1}</TableCell>
                                      <TableCell>
                                        <p className="product-content">
                                          {cur.subProductName}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        {" "}
                                        <p className="product-content">
                                          {cur.hsnNumber}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        {" "}
                                        <p className="product-content">
                                          {cur.mrp}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        {" "}
                                        <p className="product-content">
                                          {cur.quantity}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <p className="product-content">
                                          {" "}
                                          {cur.sellingPricePerUnit}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <p className="product-content">
                                          {" "}
                                          {Math.round(
                                            cur.totalSellingPricePerUnit * 100
                                          ) / 100}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <p className="product-content">
                                          {cur.gst}{" "}
                                        </p>
                                      </TableCell>
                                      <TableCell>
                                        <p className="product-content">
                                          {Math.round(
                                            cur.totalSellingPricePerUnit *
                                              cur.quantity *
                                              100
                                          ) / 100}
                                        </p>
                                      </TableCell>
                                    </TableRow>
                                  </>
                                );
                              })
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Box
                      // bgcolor="#FFFFE0"
                      sx={{
                        maxWidth: "90%",
                        marginRight: "auto",
                        marginLeft: "auto",
                        marginTop: "0.4rem",
                        padding: "0.5rem",
                        borderRadius: "10px",
                      }}
                    >
                      <Box className="detail d-flex justify-content-between">
                        <div className="">
                          <h5
                            className="amount-heading"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            Base Amount
                          </h5>
                          <p
                            className="amount-rs"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            ₹
                            {orderDetails &&
                              Math.round(
                                orderDetails.details.baseAmount * 100
                              ) / 100}
                          </p>
                        </div>
                        <div className="">
                          <h5
                            className="amount-heading"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            GST Charges
                          </h5>
                          <p
                            className="amount-rs"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            ₹
                            {orderDetails &&
                              Math.round(
                                orderDetails.details.gstCharges * 100
                              ) / 100}
                          </p>
                        </div>
                        <div className="">
                          <h5
                            className="amount-heading"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            Handling Fee
                          </h5>
                          <p
                            className="amount-rs"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            ₹ {orderDetails && orderDetails.details.handlingFee}
                          </p>
                        </div>
                        <div className="">
                          <h5
                            className="amount-heading"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            Total Amount
                          </h5>
                          <p
                            className="final-rs"
                            style={{
                              fontSize: "15px",
                            }}
                          >
                            ₹
                            {orderDetails &&
                              Math.round(
                                orderDetails.details.totalAmount * 100
                              ) / 100}
                          </p>
                        </div>
                      </Box>
                    </Box>
                    {/* <br></br> */}

                    <Box>
                      <hr
                        style={{
                          marginTop: "-1px",
                          color: "#000000",
                        }}
                      />
                      <div className="bottom-side-bill d-flex justify-content-between mt-3">
                        <div className="bottom-left-side">
                          <p className="bank-line">
                            <strong>Bank Detail - </strong>
                            <span>
                              {orderDetails && orderDetails.details.bankName}
                            </span>
                          </p>
                          <p className="bank-line">
                            <strong>Account Name -</strong>{" "}
                            <span>
                              {" "}
                              {orderDetails && orderDetails.details.accountName}
                            </span>
                          </p>
                          <p className="bank-line">
                            <strong> Account No - </strong>
                            <span>
                              {" "}
                              {orderDetails &&
                                orderDetails.details.accountNumber}
                            </span>
                          </p>
                          <p className="bank-line">
                            <strong>IFSC Code - </strong>
                            <span>
                              {" "}
                              {orderDetails && orderDetails.details.ifscCode}
                            </span>
                          </p>
                        </div>

                        <div className="bottom-right-side">
                          <p className="bank-line">
                            <strong>Note -</strong>
                          </p>
                          <p className="bank-line">
                            1. CHEQUE RETURN CHARGES 600RS
                          </p>
                          <p>
                            2. PLEASE CHECK THE GOODS THOROUGHLY BEFORE TAKING
                            THEM.
                          </p>
                        </div>
                      </div>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Box>
          </div>
        </Box>
      </AppLogout>
    </>
  );
};

export default InvoiceScreen;
