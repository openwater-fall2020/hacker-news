import Cookies from "js-cookie";

export const verifyLogin = (fn) => {
  if (Cookies.get('username') && Cookies.get('uid')) {
    fn();
  };
};