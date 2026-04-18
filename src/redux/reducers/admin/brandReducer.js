//get all the brands
export const brandListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case "BRANDS_LIST_REQUEST":
      return { loading: true };

    case "BRANDS_LIST_SUCCESS":
      return { loading: false, brands: action.payload };

    case "BRANDS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add the brand
export const addBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_BRAND_REQUEST":
      return { loading: true };

    case "ADD_BRAND_SUCCESS":
      return { loading: false, success: true };

    case "ADD_BRAND_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_BRAND_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};
