export const RegisterUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };

    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: action.payload };

    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const LoginUserReducer = (state = [], action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true, isAuthenticated: false };

    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: true,
        userInfo: action.payload,
      };

    case "USER_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        userInfo: null,
        error: action.payload,
      };

    case "USER_LOGOUT":
      return {
        loading: false,
        userInfo: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
