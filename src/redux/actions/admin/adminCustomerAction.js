import axios from "axios";

//get all Customer List
export const customerList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CUSTOMER_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/applicationuser`, {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
      },
    });
    dispatch({
      type: "CUSTOMER_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "CUSTOMER_LIST_FAIL",
      payload: message,
    });
  }
};

//Active & Inactive user
export const activeInactiveUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ACTIVE_INACTIVE_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        userIdToActivate: userId,
      },
    };

    const { data } = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/activate`, {}, config);

    dispatch({
      type: "ACTIVE_INACTIVE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "ACTIVE_INACTIVE_FAIL",
      payload: message,
    });
  }
};


//get customer images
export const customerImg = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CUSTOMER_IMG_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/applicationuserimage`, {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        applicationUserId : id,
      },
    });
    dispatch({
      type: "CUSTOMER_IMG_SUCCESS",
      payload: data,
    });
    // console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "CUSTOMER_IMG_FAIL",
      payload: message,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
