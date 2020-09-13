import Cookies from "js-cookie";

export const verifyLogin = (fn) => {
  if (Cookies.get('username')) {
    fn();
  };
};

export const logout = () => {
  Cookies.remove('username');
};