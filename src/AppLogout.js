import { useCallback, useEffect, useRef } from "react";
import { logout } from "./redux/actions/userAction";
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
  const timer = useRef(null);
  const dispatch = useDispatch();

  const logoutAction = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const handleTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      resetTimer();
      logoutAction();
    }, LogOutTimer);
  }, [logoutAction, resetTimer]);

  useEffect(() => {
    const handleActivity = () => {
      resetTimer();
      handleTimer();
    };

    events.forEach((item) => {
      window.addEventListener(item, handleActivity);
    });

    handleTimer();

    return () => {
      resetTimer();
      events.forEach((item) => {
        window.removeEventListener(item, handleActivity);
      });
    };
  }, [handleTimer, resetTimer]);

  return children;
};

export default AppLogout;
