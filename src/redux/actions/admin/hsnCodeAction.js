import axios from "axios";

//get all hsn nos
export const hsnCodeList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "HSNCODE_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/hsn`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      }
    );
    dispatch({
      type: "HSNCODE_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "HSNCODE_LIST_FAIL",
      payload: error,
    });
  }
};

//add hsn code
export const addHsnCode = (hsnNo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_HSNCODE_REQUEST",
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
      `${process.env.REACT_APP_SERVER_URL}/hsn`,
      {
        hsnNumber: hsnNo,
      },
      config
    );

    dispatch({
      type: "ADD_HSNCODE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ADD_HSNCODE_FAIL",
      payload: error,
    });
  }
};


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
