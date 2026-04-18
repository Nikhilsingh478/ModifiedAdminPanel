//get all the customers
export const customerListReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case "CUSTOMER_LIST_REQUEST":
      return { loading: true };

    case "CUSTOMER_LIST_SUCCESS":
      return { loading: false, customers: action.payload };

    case "CUSTOMER_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//ACTIVE INACTIVE USER
export const activeInactiveUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "ACTIVE_INACTIVE_REQUEST":
      return { activeInactiveloading: true };

    case "ACTIVE_INACTIVE_SUCCESS":
      return { activeInactiveloading: false, activeInactivesuccess: true };

    case "ACTIVE_INACTIVE_FAIL":
      return {
        activeInactiveloading: false,
        activeInactiveerror: action.payload,
      };

    case "ACTIVE_INACTIVE_RESET":
      return { activeInactivesuccess: false };

    case "CLEAR_ERRORS":
      return { activeInactiveerror: null };

    default:
      return state;
  }
};


//customer img

export const customerImgReducer = (state = { customerImages: [] }, action) => {
  switch (action.type) {
    case "CUSTOMER_IMG_REQUEST":
      return { loadingImages: true };

    case "CUSTOMER_IMG_SUCCESS":
      return { loadingImages: false, customerImages: action.payload };

    case "CUSTOMER_IMG_FAIL":
      return { loadingImages: false, error: action.payload };

    default:
      return state;
  }
};