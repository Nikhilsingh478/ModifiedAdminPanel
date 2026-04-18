import axios from "axios";

//primary category get
export const categoryList = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CATEGORY_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/primarycategory`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          pageNumber: page,
        },
      }
    );
    dispatch({
      type: "CATEGORY_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {

    dispatch({
      type: "CATEGORY_LIST_FAIL",
      payload: error,
    });
  }
};

//get all the subcategory
export const subCategoryList =
  (id, pageNumber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "SUBCATEGORY_LIST_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/subcategory`,
        {
          headers: {
            emailId: userInfo.emailId,
            password: userInfo.password,
            pageNumber: pageNumber,
            primaryCategoryId: id,
          },
        }
      );
      dispatch({
        type: "SUBCATEGORY_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "SUBCATEGORY_LIST_FAIL",
        payload: error,
      });
    }
  };

//add the sub category
export const addSubCategory =
  (subCategoryName, primaryId, keywordId, base64Data) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADD_SUBCATEGORY_REQUEST",
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
        `${process.env.REACT_APP_SERVER_URL}/subcategory`,
        {
          subCategory: {
            subCategoryName: subCategoryName,
            primaryCategory: {
              id: primaryId,
            },
            keyword: {
              id: keywordId,
            },
          },
          photo: base64Data,
        },
        config
      );

      dispatch({
        type: "ADD_SUBCATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADD_SUBCATEGORY_FAIL",
        payload: message,
      });
    }
  };

//add the primary category
export const addPrimaryCategory =
  (name, photo) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ADD_PRIMARYCATEGORY_REQUEST",
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
        `${process.env.REACT_APP_SERVER_URL}/primarycategory`,
        {
          primaryCategory: {
            primaryCategoryName: name,
          },
          photo: photo,
        },
        config
      );

      dispatch({
        type: "ADD_PRIMARYCATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "ADD_PRIMARYCATEGORY_FAIL",
        payload: message,
      });
    }
  };

//update primary category
export const updatePrimaryCategory =
  (name, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_PRIMARYCATEGORY_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          primaryCategoryId: id,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/primarycategory`,
        {
          primaryCategoryName: name,
        },
        config
      );
      dispatch({
        type: "UPDATE_PRIMARYCATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_PRIMARYCATEGORY_FAIL",
        payload: error,
      });
    }
  };

//update sub category
export const updateSubCategory =
  (name, primaryId, subCategoryId, keywordId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_SUBCATEGORY_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          subCategoryId: subCategoryId,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/subcategory`,
        {
          subCategoryName: name,
          primaryCategory: {
            id: primaryId,
          },
          keyword: {
            id: keywordId,
          },
        },
        config
      );
      dispatch({
        type: "UPDATE_SUBCATEGORY_SUCCESS",
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: "UPDATE_SUBCATEGORY_FAIL",
        payload: message,
      });
    }
  };

//update primary category image
export const updatePrimaryCateImage =
  (id, image) => async (dispatch, getState) => {
    try {
      dispatch({
        type: "UPDATE_PRIMARYCATEIMG_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const config = {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
          primaryCategoryImageId: id,
        },
      };
      const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/primarycategoryimage`,
        {
          photo: image,
        },
        config
      );
      dispatch({
        type: "UPDATE_PRIMARYCATEIMG_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "UPDATE_PRIMARYCATEIMG_FAIL",
        payload: error,
      });
    }
  };

//update SUB category image
export const updateSubCateImage = (id, image) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_SUBCATEIMG_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        subCategoryImageId: id,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/subcategoryimage`,
      {
        photo: image,
      },
      config
    );
    dispatch({
      type: "UPDATE_SUBCATEIMG_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SUBCATEIMG_FAIL",
      payload: error,
    });
  }
};

//GET ALL primary category (Without Pagination)
export const allPrimaryCateList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "PRMCATEGORY_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/allprimarycategory`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      }
    );
    dispatch({
      type: "PRMCATEGORY_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "PRMCATEGORY_LIST_FAIL",
      payload: error,
    });
  }
};



//get all the subcategory (without pagination)
export const allSubCateList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: "ALLSUBCATE_LIST_REQUEST",
      });

      const {
        LoginUserReducer: { userInfo },
      } = getState();

      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/allsubcategory`,
        {
          headers: {
            emailId: userInfo.emailId,
            password: userInfo.password,
           },
        }
      );
      dispatch({
        type: "ALLSUBCATE_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ALLSUBCATE_LIST_FAIL",
        payload: error,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
