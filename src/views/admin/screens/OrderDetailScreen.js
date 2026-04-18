import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppLogout from "../../../AppLogout";
import { orderDetailShow } from "../../../redux/actions/admin/adminOrderAction";
import { formatDate } from "../../../helper/FormatDateTime";
import "./OrderDetailScreen.css";

const OrderDetailScreen = (props) => {
  const dispatch = useDispatch();
  const { id } = useParams("");

  const { status, date } = props.location.state;

  //orders details state
  const orderDetailsState = useSelector((state) => state.orderDetail);
  const { loading, orderDetails } = orderDetailsState;

  useEffect(() => {
    dispatch(orderDetailShow(id));
  }, [dispatch]);

  return (
    <>
      <AppLogout>
        <div className="orderdetails">
          <div className="sidebar-div">
            <Sidebar />
          </div>

          <div
            className="main-section "
            style={{
              marginLeft: "16%",
            }}
          >
            {/* <div
              className="order-detail shadow"
              style={{

                // width: "75%",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1rem",
                marginLeft: "1rem",
                borderRadius: "12px",
                marginTop:'-10px'
              }}
            > */}
            <div
              className="detail d-flex justify-content-between"
              style={{
                marginTop: "-50px",
              }}
            >
              <div className="invoice-div">
                <h2>INVOICE</h2>
                <p>
                  STATUS: <span>{status}</span>
                </p>
                <p>
                  DATE - <span className="date">{formatDate(date)}</span>
                </p>
              </div>
              <div className="address-details">
                <h2>{orderDetails && orderDetails.details.name}</h2>
                <div className="address-div">
                  <p>
                    {orderDetails &&
                      `${orderDetails.details.addressLineOne} , ${orderDetails.details.city}, ${orderDetails.details.state}, ${orderDetails.details.pinCode}`}
                  </p>
                </div>
                <p>
                  Mobile no -{" "}
                  <span>
                    {orderDetails && orderDetails.details.mobileNumber}
                  </span>{" "}
                </p>
              </div>
            </div>
            {/* </div> */}

            <TableContainer
              className="d-flex justify-content-center"
              component={Paper}
              style={{
                margin: "1rem",
                marginRight: "auto",
                marginLeft: "auto",
              }}
              sx={
                {
                  // width: "950px",
                }
              }
            >
              <Table
                style={
                  {
                    // width: "95%",
                  }
                }
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
                    <TableCell size="small" style={{ width: "10%" }}>
                      <Typography> Image</Typography>
                    </TableCell>
                    <TableCell style={{ width: "20%" }}>
                      <Typography>Name</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <Typography>QTY</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <Typography>MRP</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <Typography>Selling price(wihout gst)</Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <Typography> GST(%) </Typography>
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      <Typography>Total price</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {orderDetails && orderDetails.orderItemsList.length > 0
                  ? orderDetails.orderItemsList.map((cur, index) => {
                      return (
                        <TableBody>
                          <TableCell>
                            <img
                              src={cur.imagePathOne}
                              style={{
                                width: "50px",
                                height: "50px",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography>{cur.subProductName}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{cur.quantity}</Typography>
                          </TableCell>
                          <TableCell>{cur.mrp}</TableCell>
                          <TableCell>
                            <Typography>{cur.sellingPricePerUnit}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography>{cur.gst}</Typography>
                          </TableCell>

                          <TableCell>
                            <Typography>
                              {Math.round(
                                cur.totalSellingPricePerUnit *
                                  cur.quantity *
                                  100
                              ) / 100}
                            </Typography>
                          </TableCell>
                        </TableBody>
                      );
                    })
                  : null}
              </Table>
            </TableContainer>

            <div
              className="amount-detail shadow"
              style={{
                width: "950px",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "auto",
                marginLeft: "auto",
                borderRadius: "6px",
              }}
            >
              <div className="detail d-flex justify-content-between">
                <div className="">
                  <h2 className="amount-heading">Base Amount</h2>
                  <p className="amount-rs">
                    ₹{" "}
                    {orderDetails &&
                      Math.round(orderDetails.details.baseAmount * 100) / 100}
                  </p>
                </div>
                <div className="">
                  <h2 className="amount-heading">GST Charges</h2>
                  <p className="amount-rs">
                    ₹{" "}
                    {orderDetails &&
                      Math.round(orderDetails.details.gstCharges)}
                  </p>
                </div>
                <div className="">
                  <h2 className="amount-heading">Handling Fee</h2>
                  <p className="amount-rs">
                    ₹ {orderDetails && orderDetails.details.handlingFee}
                  </p>
                </div>
                <div className="">
                  <h2 className="amount-heading">Total Amount</h2>
                  <p className="final-rs">
                    ₹{" "}
                    {orderDetails &&
                      Math.round(orderDetails.details.totalAmount * 100) / 100}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLogout>
    </>
  );
};

export default OrderDetailScreen;
