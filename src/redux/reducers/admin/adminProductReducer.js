//get all the admin prod
export const adminProductListReducer = (state = { adminProd: [] }, action) => {
  switch (action.type) {
    case "ADMINPRODUCT_LIST_REQUEST":
      return { loading: true };

    case "ADMINPRODUCT_LIST_SUCCESS":
      return { loading: false, adminProd: action.payload };

    case "ADMINPRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add the product
export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_REQUEST":
      return { loading: true };

    case "ADD_PRODUCT_SUCCESS":
      return { loading: false, success: true };

    case "ADD_PRODUCT_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_PRODUCT_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};

//Update product
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRODUCT_REQUEST":
      return { updateLoading: true };

    case "UPDATE_PRODUCT_SUCCESS":
      return { updateLoading: false, updateSuccess: true };

    case "UPDATE_PRODUCT_FAIL":
      return { updateLoading: false, updateError: action.payload };

    case "UPDATE_PRODUCT_RESET":
      return { updateSuccess: null };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//get all the admin SUB prod
export const adminSubProductListReducer = (
  state = { adminSubProd: [] },
  action
) => {
  switch (action.type) {
    case "ADMINSUBPROD_LIST_REQUEST":
      return { loading: true };

    case "ADMINSUBPROD_LIST_SUCCESS":
      return { loading: false, adminSubProd: action.payload };

    case "ADMINSUBPROD_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//add the SUB product
export const addSubProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_SUBPRODUCT_REQUEST":
      return { loading: true };

    case "ADD_SUBPRODUCT_SUCCESS":
      return { loading: false, success: true };

    case "ADD_SUBPRODUCT_FAIL":
      return { loading: false, error: action.payload };

    case "ADD_SUBPRODUCT_RESET":
      return { success: false };

    case "CLEAR_ERRORS":
      return { error: null };

    default:
      return state;
  }
};

// UPDATE SUB product
export const updateSubProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUBPRODUCT_REQUEST":
      return { updateLoading: true };

    case "UPDATE_SUBPRODUCT_SUCCESS":
      return { updateLoading: false, updateSuccess: true };

    case "UPDATE_SUBPRODUCT_FAIL":
      return { updateLoading: false, updateError: action.payload };

    case "UPDATE_SUBPRODUCT_RESET":
      return { updateSuccess: null };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//UPDATE PRODUCT IMAGE
export const updateProdImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PRODIMG_REQUEST":
      return { updateImgLoading: true };

    case "UPDATE_PRODIMG_SUCCESS":
      return { updateImgLoading: false, updateImgSuccess: true };

    case "UPDATE_PRODIMG_FAIL":
      return { updateImgLoading: false, updateImgError: action.payload };

    case "UPDATE_PRODIMG_RESET":
      return { updateImgSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};

//UPDATE SUB PRODUCT IMAGE
export const updateSubProdImageReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SUBPRODIMG_REQUEST":
      return { updateImgLoading: true };

    case "UPDATE_SUBPRODIMG_SUCCESS":
      return { updateImgLoading: false, updateImgSuccess: true };

    case "UPDATE_SUBPRODIMG_FAIL":
      return { updateImgLoading: false, updateImgError: action.payload };

    case "UPDATE_SUBPRODIMG_RESET":
      return { updateImgSuccess: false };

    case "CLEAR_ERRORS":
      return { updateError: null };

    default:
      return state;
  }
};


//get all products without pagination
export const allProductsListReducer = (state = { allProducts: [] }, action) => {
  switch (action.type) {
    case "ALLPRODUCTS_LIST_REQUEST":
      return { loading: true };

    case "ALLPRODUCTS_LIST_SUCCESS":
      return { loading: false, allProducts: action.payload };

    case "ALLPRODUCTS_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
