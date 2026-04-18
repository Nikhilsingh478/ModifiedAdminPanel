import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { orderStatusList , UpdateOrderStatus} from "../../../redux/actions/admin/adminOrderAction";

const ChangeOrderStatus = ({orderId}) => {
  const dispatch = useDispatch();

  // order status state
  const orderStatusState = useSelector((state) => state.orderStatus);
  const { orderStatus } = orderStatusState;

  //update order status
  const onSelectChange = ({ currentTarget: input }) => {
    dispatch(UpdateOrderStatus(orderId,input.value))
  };

  useEffect(() => {
    dispatch(orderStatusList());
  }, []);

  return (
    <>
      <Box>
        <select
          style={{
            width: "8rem",
            height: "39px",
            borderRadius: "4px",
            padding: "5px",
          }}
          onChange={onSelectChange}
        >
          {orderStatus &&
            orderStatus.map((cur) => {
              return (
                <>
                  <option
                    id={cur.id}
                    style={{
                      width: "30rem",
                      height: "10px",
                      fontSize: "14px",
                    }}
                    value={cur.id}
                  >
                    {cur.orderStatusName}
                  </option>
                </>
              );
            })}
        </select>
      </Box>
    </>
  );
};

export default ChangeOrderStatus;
