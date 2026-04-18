import axios from "axios";

//get all brands
export const brandsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "BRANDS_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/brand`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      }
    );
    dispatch({
      type: "BRANDS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "BRANDS_LIST_FAIL",
      payload: message,
    });
  }
};

//add brand
export const addBrand = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_BRAND_REQUEST",
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
      `${process.env.REACT_APP_SERVER_URL}/brand`,
      {
        brandName: name,
      },
      config
    );

    dispatch({
      type: "ADD_BRAND_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "ADD_BRAND_FAIL",
      payload: message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
