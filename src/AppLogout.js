import React, { useEffect } from "react";
import { logout } from "./redux/actions/userAction"
import { useDispatch } from "react-redux";

let LogOutTimer = process.env.REACT_APP_LOGOUT_TIMER;

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;
    const dispatch = useDispatch();

useEffect(() => {
  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleTimer();
    });
  });
}, []);

const resetTimer = () => {
  if (timer) clearTimeout(timer);
};

const handleTimer = () => {
  timer = setTimeout(() => {
    resetTimer();
    Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
    logoutAction();
  }, LogOutTimer);
};

const logoutAction = () => {
 dispatch(logout());
};
  return children;
};

export default AppLogout;

