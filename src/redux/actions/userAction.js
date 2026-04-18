import axios from "axios";
import CryptoJS from "crypto-js";

let keyVar = process.env.REACT_APP_KEYVAR;

export const registerUser =
  (fullName, emailId, mobilenumber, password) => async (dispatch) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    try {
      const config = {
        Headers: {
          "Content-type": "applications/json",
        },
      };

      const res = await axios.post(
        `/applicationuser`,
        { fullName, emailId, mobilenumber, password },
        config
      );
      // console.log(fullName, emailId,mobilenumber, password);

      dispatch({ type: "USER_REGISTER_SUCCESS", payload: res });
    } catch (error) {
      dispatch({ type: "USER_REGISTER_FAIL", payload: error });
    }
  };



export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const loginUser = (emailId, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    //encrypt pass 
    var Orgdata = password;
    
    var key = CryptoJS.enc.Latin1.parse(keyVar);
    var iv = CryptoJS.enc.Latin1.parse(keyVar);
    var encrypted = CryptoJS.AES.encrypt(Orgdata, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    
    //end

    
    const config = {
      headers: {
        emailId: emailId,
        password: encrypted.toString(),
      },
    };
    
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {}, config);

    //set localstorage
    localStorage.setItem("userInfo", JSON.stringify(data));

    //update localstorage password
    let localStorageData = JSON.parse(localStorage.getItem("userInfo"));
    let updateData = { ...localStorageData, password: encrypted.toString() };

    //set the updated data to the localstorage
    localStorage.setItem("userInfo", JSON.stringify(updateData));

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
     window.location.href = `${process.env.REACT_APP_HOSTED_URL}`;
    //  <Redirect to={{path : `${process.env.REACT_APP_HOSTED_URL}/admin/dashboard`}} />
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: error,
    });
  }
};

