import axios from "axios";

//get all Orders
export const ordersList = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDERS_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/order`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          pageNumber: page,
        },
      }
    );
    dispatch({
      type: "ORDERS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDERS_LIST_FAIL",
      payload: error.message,
    });
  }
};

//get Order detail
export const orderDetailShow = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_DETAIL_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orderdetails`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          orderId: orderId,
        },
      }
    );
    dispatch({
      type: "ORDER_DETAIL_SUCCESS",
      payload: data,
    });
    // console.log(data.orderList);
  } catch (error) {
    dispatch({
      type: "ORDER_DETAIL_FAIL",
      payload: error.message,
    });
  }
};

//cancel Order
export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDER_CANCEL_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        orderId: orderId,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/cancelorder`,
      {},
      config
    );

    dispatch({
      type: "ORDER_CANCEL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_CANCEL_FAIL",
      payload: error,
    });
  }
};

//get order status List
export const orderStatusList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ORDERSTATUS_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/orderstatus`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      }
    );
    dispatch({
      type: "ORDERSTATUS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDERSTATUS_LIST_FAIL",
      payload: error,
    });
  }
};

//Change Order Status
export const UpdateOrderStatus =
  (orderId, statusId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "CHANGE_ORDERSTATUS_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          orderId: orderId,
          statusId: statusId,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/changeorderstatus`,
        {},
        config
      );

      dispatch({
        type: "CHANGE_ORDERSTATUS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CHANGE_ORDERSTATUS_FAIL",
        payload: error,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
