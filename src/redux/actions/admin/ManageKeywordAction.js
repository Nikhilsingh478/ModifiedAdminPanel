import axios from "axios";

//get all keywords
export const keywordsList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "KEYWORDS_LIST_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/keyword`,
      {
        headers: {
          emailId: userInfo.emailId,
          password: userInfo.password,
        },
      }
    );
    dispatch({
      type: "KEYWORDS_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "KEYWORDS_LIST_FAIL",
      payload: message,
    });
  }
};

//add Keywords
export const addKeywords = (keywords) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "ADD_KEYWORDS_REQUEST",
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
      `${process.env.REACT_APP_SERVER_URL}/keyword`,
      {
        keywords: keywords,
      },
      config
    );

    dispatch({
      type: "ADD_KEYWORDS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: "ADD_KEYWORDS_FAIL",
      payload: message,
    });
  }
};

//update keyword
export const updateKeywords = (text, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_KEYWORD_REQUEST",
    });

    const {
      LoginUserReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        emailId: userInfo.emailId,
        password: userInfo.password,
        keywordId: id,
      },
    };
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/keyword`,
      {
        keywords: text,
      },
      config
    );
    dispatch({
      type: "UPDATE_KEYWORD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_KEYWORD_FAIL",
      payload: error,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};
