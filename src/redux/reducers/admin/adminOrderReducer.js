//get all the Orders
export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDERS_LIST_REQUEST":
      return { loading: true };

    case "ORDERS_LIST_SUCCESS":
      return { loading: false, orders: action.payload };

    case "ORDERS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//get the OrderDetails
export const orderDetailReducer = (
  state = { orderDetails: { details: {}, orderItemsList: [] } },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAIL_REQUEST":
      return { loading: true };

    case "ORDER_DETAIL_SUCCESS":
      return {
        loading: false,

        orderDetails: {
          details: action.payload,
          orderItemsList: action.payload.orderList,
        },
      };

    case "ORDER_DETAIL_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//cancel Order
export const orderCancelReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CANCEL_REQUEST":
      return { calncelLoading: true };

    case "ORDER_CANCEL_SUCCESS":
      return { calncelLoading: false, cancelSuccess: true };

    case "ORDER_CANCEL_FAIL":
      return { calncelLoading: false, cancelError: action.payload };

    case "ORDER_CANCEL_RESET":
      return { cancelSuccess: false };

    case "CLEAR_ERRORS":
      return { cancelError: null };

    default:
      return state;
  }
};

//Change Order status
export const UpdateOrderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_ORDERSTATUS_REQUEST":
      return { changeStatusLoading: true };

    case "CHANGE_ORDERSTATUS_SUCCESS":
      return { changeStatusLoading: false, changeStatusSuccess: true };

    case "CHANGE_ORDERSTATUS_FAIL":
      return { changeStatusLoading: false, changeStatusError: action.payload };

    case "CHANGE_ORDERSTATUS_RESET":
      return { changeStatusSuccess: false };

    case "CLEAR_ERRORS":
      return { changeStatusError: null };

    default:
      return state;
  }
};

//get order status List
export const orderStatusListReducer = (state = { orderStatus: [] }, action) => {
  switch (action.type) {
    case "ORDERSTATUS_LIST_REQUEST":
      return { orderStatusLoading: true };

    case "ORDERSTATUS_LIST_SUCCESS":
      return { orderStatusLoading: false, orderStatus: action.payload };

    case "ORDERSTATUS_LIST_FAIL":
      return { orderStatusLoading: false, orderStatusError: action.payload };

    default:
      return state;
  }
};
