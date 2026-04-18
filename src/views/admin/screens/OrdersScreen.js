import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Backdrop, CircularProgress } from "@mui/material";
import { ordersList } from "../../../redux/actions/admin/adminOrderAction";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../helper/FormatDateTime";
import Pagination from "../../Pagination";
import CancelOrder from "../components/CancelOrder";
import toast, { Toaster } from "react-hot-toast";
import { clearErrors } from "../../../redux/actions/admin/adminOrderAction";
import ChangeOrderStatus from "../components/ChangeOrderStatus";

import Layout from "../../../components/layout/Layout";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/StatusBadge";

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
  const { changeStatusLoading, changeStatusSuccess, changeStatusError } = updateOrderState;

  useEffect(() => {
    dispatch(ordersList(page));
  }, [dispatch, page, cancelSuccess, changeStatusSuccess]);

  useEffect(() => {
    if (cancelError) {
      toast.error("Something went wrong", { position: "top-center", duration: 3000 });
      dispatch(clearErrors());
    }
    if (cancelSuccess) {
      toast.success("Order cancel success", { position: "top-center", duration: 3000 });
      dispatch({ type: "ORDER_CANCEL_RESET" });
    }
    if (changeStatusSuccess) {
      toast.success("Status Updated success", { position: "top-center", duration: 3000 });
      dispatch({ type: "CHANGE_ORDERSTATUS_RESET" });
    }
    if (changeStatusError) {
      toast.error("Something went wrong", { position: "top-center", duration: 3000 });
      dispatch(clearErrors());
    }
  }, [cancelSuccess, cancelError, changeStatusSuccess, changeStatusError, dispatch]);

  const columns = [
    { label: "#id", field: "id" },
    { label: "Order Id", field: "orderId" },
    { label: "Time", field: "dateTime" },
    { label: "Status", field: "orderStatus" },
    { label: "Amount", field: "amount" },
    { label: "Change Status", field: "changeStatus" },
    { label: "Cancel", field: "cancel" },
    { label: "Invoice", field: "invoice" },
    { label: "Details", field: "details" },
  ];

  return (
    <Layout>
      <PageHeader title="Orders List" />
      
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Boolean(calncelLoading || changeStatusLoading)}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <DataTable
        columns={columns}
        data={orders || []}
        loading={loading}
        renderCell={(row, col, rowIndex) => {
          if (col.field === "id") return rowIndex + 1;
          if (col.field === "dateTime") return formatDate(row.dateTime);
          if (col.field === "orderStatus") return <StatusBadge status={row.orderStatus} />;
          if (col.field === "amount") return `₹ ${Math.round(row.totalPrice * 100) / 100}`;
          if (col.field === "changeStatus") return <ChangeOrderStatus orderId={row.orderId} />;
          if (col.field === "cancel") return <CancelOrder orderId={row.orderId} />;
          if (col.field === "invoice") return (
            <Button
              size="small"
              variant="outlined"
              onClick={() => history.push({ pathname: `/admin/invoice/${row.orderId}`, state: { date: row.dateTime } })}
            >
              Invoice
            </Button>
          );
          if (col.field === "details") return (
            <Button
              size="small"
              variant="outlined"
              onClick={() => history.push({ pathname: `/admin/order/${row.orderId}`, state: { status: row.orderStatus, date: row.dateTime } })}
            >
              Details
            </Button>
          );
          return row[col.field];
        }}
      />
      
      <Pagination page={page} setPage={(page) => setPage(page)} />
      <Toaster />
    </Layout>
  );
};

export default OrdersScreen;
