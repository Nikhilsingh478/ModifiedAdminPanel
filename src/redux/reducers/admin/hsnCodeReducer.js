//get all the HSN codes
export const hsnCodeListReducer = (state = { hsnCodes: [] }, action) => {
  switch (action.type) {
    case "HSNCODE_LIST_REQUEST":
      return { loading: true };

    case "HSNCODE_LIST_SUCCESS":
      return { loading: false, hsnCodes: action.payload };

    case "HSNCODE_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add
export const addHsnCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_HSNCODE_REQUEST":
      return { addloading: true };

    case "ADD_HSNCODE_SUCCESS":
      return { addloading: false, success: true };

    case "ADD_HSNCODE_FAIL":
      return { addloading: false, error: action.payload };

    case "ADD_HSNCODE_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};
