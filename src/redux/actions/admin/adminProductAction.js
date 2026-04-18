import axios from "axios";

//get all admin product list
export const adminProductList =
  (categoryId, page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADMINPRODUCT_LIST_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/product`,
        {
          headers: {
            emailId: userInfo.emailId,
            password: userInfo.password,
            subCategoryId: categoryId,
            pageNumber: page,
          },
        }
      );
      dispatch({
        type: "ADMINPRODUCT_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADMINPRODUCT_LIST_FAIL",
        payload: message,
      });
    }
  };

//add the product
export const addProduct =
  (productName, subCategoryID, keywordID, brandID, base64Data, HsnNo) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADD_PRODUCT_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/product`,
        {
          product: {
            productName: productName,
            keyword: {
              id: keywordID,
            },
            subCategory: {
              id: subCategoryID,
            },
            brand: {
              id: brandID,
            },
            hsn: {
              id: HsnNo,
            },
          },
          photo: base64Data,
        },
        config
      );

      dispatch({
        type: "ADD_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADD_PRODUCT_FAIL",
        payload: message,
      });
    }
  };

//get all admin sub product list
export const adminSubProductList =
  (productId, page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADMINSUBPROD_LIST_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/subproduct`,
        {
          headers: {
            emailId: userInfo.emailId,
            password: userInfo.password,
            productId: productId,
            pageNumber: page,
          },
        }
      );
      dispatch({
        type: "ADMINSUBPROD_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADMINSUBPROD_LIST_FAIL",
        payload: message,
      });
    }
  };

//add the sub product
export const addSubProduct =
  (
    name,
    buyingPrice,
    sellingPrice,
    gst,
    discountPercent,
    productId,
    photoOne,
    photoTwo,
    MRP
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADD_SUBPRODUCT_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/subproduct`,
        {
          subProduct: {
            subProductName: name,
            buyingPrice: buyingPrice,
            sellingPrice: sellingPrice,
            gst: gst,
            discountPercent: discountPercent,
            mrp: MRP,
            product: {
              id: productId,
            },
          },
          photoOne: photoOne,
          photoTwo: photoTwo,
        },
        config
      );

      dispatch({
        type: "ADD_SUBPRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADD_SUBPRODUCT_FAIL",
        payload: message,
      });
    }
  };

//update the product
export const updateProduct =
  (prodId, productName, keywordID, subCategoryID, brandID, HsnNo) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_PRODUCT_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          productId: prodId,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/product`,
        {
          productName: productName,
          keyword: {
            id: keywordID,
          },
          subCategory: {
            id: subCategoryID,
          },
          brand: {
            id: brandID,
          },
          hsn: {
            id: HsnNo,
          },
        },
        config
      );

      dispatch({
        type: "UPDATE_PRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "UPDATE_PRODUCT_FAIL",
        payload: message,
      });
    }
  };

//UPDATE the sub product
export const updateSubProduct =
  (
    name,
    buyingPrice,
    sellingPrice,
    gst,
    discountPercent,
    mrp,
    productId,
    subProductId
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_SUBPRODUCT_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          subProductId: subProductId,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/subproduct`,
        {
          subProductName: name,
          buyingPrice: buyingPrice,
          sellingPrice: sellingPrice,
          gst: gst,
          discountPercent: discountPercent,
          mrp: mrp,
          product: {
            id: productId,
          },
        },
        config
      );

      dispatch({
        type: "UPDATE_SUBPRODUCT_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "UPDATE_SUBPRODUCT_FAIL",
        payload: message,
      });
    }
  };

//update prod Image
export const updateProdImg = (id, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_PRODIMG_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        productImageId: id,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/productimage`,
      {
        photo: image,
      },
      config
    );
    dispatch({
      type: "UPDATE_PRODIMG_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PRODIMG_FAIL",
      payload: error,
    });
  }
};



//update SUB prod Image
export const updateSubProdImg = (id, image1,image2) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_SUBPRODIMG_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        subProductImageId: id,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/subproductimage`,
      {
        photoOne: image1,
        photoTwo: image2,
      },
      config
    );
    dispatch({
      type: "UPDATE_SUBPRODIMG_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SUBPRODIMG_FAIL",
      payload: error,
    });
  }
};



//get all product without pagination
export const allProductsList =() => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ALLPRODUCTS_LIST_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/allproduct`,
        {
          headers: {
            emailId: userInfo.emailId,
            password: userInfo.password,
          },
        }
      );
      dispatch({
        type: "ALLPRODUCTS_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALLPRODUCTS_LIST_FAIL",
        payload: error,
      });
    }
  };



// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
