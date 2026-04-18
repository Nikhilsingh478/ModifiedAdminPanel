import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, CircularProgress, Button, Backdrop } from "@mui/material";
import { ordersList } from "../../../redux/actions/admin/adminOrderAction";
import { useDispatch, useSelector } from "react-redux";
import AppLogout from "../../../AppLogout";
import { formatDate } from "../../../helper/FormatDateTime";
import Pagination from "../../Pagination";
import CancelOrder from "../components/CancelOrder";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors } from "../../../redux/actions/admin/adminOrderAction";
import ChangeOrderStatus from "../components/ChangeOrderStatus";

const OrdersScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  //orders list state
  const orderState = useSelector((state) => state.ordersList);
  const { loading, orders } = orderState;

  //cancel order state
  const cancelOrderState = useSelector((state) => state.orderCancel);
  const { calncelLoading, cancelSuccess, cancelError } = cancelOrderState;

  //update order status state
  const updateOrderState = useSelector((state) => state.changeOrderStatus);
  const { changeStatusLoading, changeStatusSuccess, changeStatusError } =
    updateOrderState;

  useEffect(() => {
    dispatch(ordersList(page));
  }, [dispatch, page, cancelSuccess, changeStatusSuccess]);

  useEffect(() => {
    if (cancelError) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
    }
    if (cancelSuccess) {
      toast.success("Order cancel success", {
        position: "top-center",
        duration: 3000,
      });

      dispatch({ type: "ORDER_CANCEL_RESET" });
    }

    if (changeStatusSuccess) {
      toast.success("Status Updated success", {
        position: "top-center",
        duration: 3000,
      });

      dispatch({ type: "CHANGE_ORDERSTATUS_RESET" });
    }

    if (changeStatusError) {
      toast.error("Something went wrong", {
        position: "top-center",
        duration: 3000,
      });
      dispatch(clearErrors());
    }
  }, [
    cancelSuccess,
    cancelError,
    changeStatusSuccess,
    changeStatusError,
    dispatch,
  ]);

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
            {/* <AddBrand /> */}

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
                stickyHeader
                aria-label="sticky table"
              >
                <div className="loading-style">
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={calncelLoading || changeStatusLoading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>

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
                    {/* <TableCell size="small">OrderId</TableCell> */}
                    <TableCell>Order Id</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Change Status</TableCell>
                    <TableCell>Cancel</TableCell>
                    <TableCell>Invoice </TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map((cur, ind) => {
                      return (
                        <>
                          <TableRow
                            hover
                            key={cur.orderId}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{ind + 1}</TableCell>

                            <TableCell>{cur.orderId}</TableCell>
                            <TableCell>{formatDate(cur.dateTime)}</TableCell>
                            <TableCell>{cur.orderStatus}</TableCell>
                            <TableCell>
                              {" "}
                              ₹ {Math.round(cur.totalPrice * 100) / 100}
                            </TableCell>
                            <TableCell>
                              <ChangeOrderStatus orderId={cur.orderId} />
                            </TableCell>
                            <TableCell>
                              <CancelOrder orderId={cur.orderId} />
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                  history.push({
                                    pathname: `/admin/invoice/${cur.orderId}`,
                                    state: {
                                      // status: cur.orderStatus,
                                      date: cur.dateTime,
                                    },
                                  })
                                }
                              >
                                Invoice
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() =>
                                  history.push({
                                    pathname: `/admin/order/${cur.orderId}`,
                                    state: {
                                      status: cur.orderStatus,
                                      date: cur.dateTime,
                                    },
                                  })
                                }
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Pagination page={page} setPage={(page) => setPage(page)} />
        </div>
      </AppLogout>
      <Toaster />
    </>
  );
};

export default OrdersScreen;
