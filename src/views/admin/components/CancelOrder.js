import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
} from "../../../redux/actions/admin/adminOrderAction";

const CancelOrder = ({ orderId }) => {

  const dispatch = useDispatch();
  //cancel Order
  const Cancel = () => {
    dispatch(cancelOrder(orderId));
  };

  return (
    <>
      <Button size="small" variant="outlined" onClick={Cancel}>
        Cancel
      </Button>
     
    </>
  );
};

export default CancelOrder;
